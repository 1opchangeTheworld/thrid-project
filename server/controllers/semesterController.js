const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSemesters = async (req, res) => {
  try {
    const semesters = await prisma.semester.findMany({include: { enrollments: true } });
    res.json(semesters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSemesterById = async (req, res) => {
  try {
    const semester = await prisma.semester.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!semester) return res.status(404).json({ error: "Semester not found" });
    res.json(semester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSemester = async (req, res) => {
  try {
    const { year, term, startDate, endDate } = req.body;
    const semester = await prisma.semester.create({
      data: { year, term, startDate: new Date(startDate), endDate: new Date(endDate) },
    });
    res.status(201).json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSemester = async (req, res) => {
  try {
    const { year, term, startDate, endDate } = req.body;
    const semester = await prisma.semester.update({
      where: { id: Number(req.params.id) },
      data: { year, term, startDate: new Date(startDate), endDate: new Date(endDate) },
    });
    res.json(semester);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSemester = async (req, res) => {
  try {
    await prisma.semester.delete({
      where: { id: Number(req.params.id) },
    });
    res.json({ message: "Semester deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSemesterSummary = async (req, res) => {
  try {
    const semesterId = Number(req.params.id);

    // Get all faculties for this semester (via enrollments)
    const faculties = await prisma.faculty.findMany({
      where: {
        enrollments: {
          some: { semester_id: semesterId }
        }
      },
      include: {
        majors: {
          include: {
            _count: {
              select: {
                students: {
                  where: {
                    enrollments: {
                      some: { semester_id: semesterId }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // Calculate total students enrolled in this semester
    const totalStudents = await prisma.enrollment.count({
      where: { semester_id: semesterId }
    });

    res.json({
      semesterId,
      faculties: faculties.map(faculty => ({
        id: faculty.id,
        name: faculty.name,
        majors: faculty.majors.map(major => ({
          id: major.id,
          name: major.name,
          studentCount: major._count.students
        }))
      })),
      totalStudents
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubjectsByYearFacultyMajor = async (req, res) => {
  const year = parseInt(req.params.year);
  const facultyId = Number(req.params.facultyId);
  const majorId = Number(req.params.majorId);

  try {
    const semesters = await prisma.semester.findMany({
      where: { year },
      include: {
        semesterSubjects: {
          include: { subject: true }
        }
      }
    });

    let subjects = semesters.flatMap(sem =>
      sem.semesterSubjects.map(ss => ss.subject)
    );

    if (facultyId) {
      subjects = subjects.filter(subject => subject.facultiesId === facultyId);
    }
    if (majorId && subjects.length > 0 && 'majorsId' in subjects[0]) {
      subjects = subjects.filter(subject => subject.majorsId === majorId);
    }

    res.json({ year, subjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSemesterSummaryByYear = async (req, res) => {
  try {
    const year = Number(req.params.year);

    const semesters = await prisma.semester.findMany({
      where: { year },
      select: { id: true }
    });
    const semesterIds = semesters.map(s => s.id);

    const faculties = await prisma.faculty.findMany({
      where: {
        enrollments: {
          some: { semester_id: { in: semesterIds } }
        }
      },
      include: {
        majors: {
          include: {
            _count: {
              select: {
                students: {
                  where: {
                    enrollments: {
                      some: { semester_id: { in: semesterIds } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    const totalStudents = await prisma.enrollment.count({
      where: { semester_id: { in: semesterIds } }
    });

    res.json({
      year,
      faculties: faculties.map(faculty => ({
        id: faculty.id,
        name: faculty.name,
        majors: faculty.majors.map(major => ({
          id: major.id,
          name: major.name,
          studentCount: major._count.students
        }))
      })),
      totalStudents
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};