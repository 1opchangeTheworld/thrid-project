const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  await prisma.subjectStudent.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.semesterSubject.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();
  await prisma.student.deleteMany();
  await prisma.major.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.semester.deleteMany();

  const faculty = await prisma.faculty.create({
    data: {
      name: "Engineering"
    }
  });

  const major = await prisma.major.create({
    data: {
      name: "Computer Engineering",
      faculty_id: faculty.id
    }
  });

  const semester = await prisma.semester.create({
    data: {
      year: 2024,
      term: 1,
      startDate: new Date("2024-06-01T00:00:00Z"),
      endDate: new Date("2024-10-01T00:00:00Z")
    }
  });

  // Create Users and Students
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        username: `student${i}`,
        password: await bcrypt.hash(`password${i}`, 10),
        firstname: `Firstname${i}`,
        lastname: `Lastname${i}`,
        telephone: `08000000${i}`,
        email: `student${i}@example.com`,
        faculties_id: faculty.id,
        majors_id: major.id,
        profile_img: "",
        role: "student",
        actives: true
      }
    });

    await prisma.student.create({
      data: {
        student_id: `S2024${i.toString().padStart(3, '0')}`,
        password: await bcrypt.hash(`password${i}`, 10),
        title_th: i % 2 === 0,
        firstname_th: `ชื่อ${i}`,
        lastname_th: `นามสกุล${i}`,
        faculties_id: faculty.id,
        majors_id: major.id,
        certificate: `Cert${i}`,
        email: `student${i}@example.com`,
        actives: true
      }
    });
  }

  // Create 10 BS subjects
  for (let i = 1; i <= 10; i++) {
    await prisma.subject.create({
      data: {
        id: `bs-${i}`,
        facultiesId: faculty.id,
        majorId: major.id,
        subId: `BS${i.toString().padStart(3, '0')}`,
        subName: `BS Subject ${i}`,
        subUnit: 3,
        subGroup: false,
        type: "bs"
      }
    });
  }

  for (let i = 1; i <= 10; i++) {
    await prisma.subject.create({
      data: {
        id: `tr-${i}`,
        facultiesId: faculty.id,
        majorId: major.id,
        subId: `TR${i.toString().padStart(3, '0')}`,
        subName: `Trans Subject ${i}`,
        subUnit: 3,
        subGroup: false,
        type: "trans"
      }
    });
  }

  const allSubjects = await prisma.subject.findMany();
  for (const subject of allSubjects) {
    await prisma.semesterSubject.create({
      data: {
        semesterId: semester.id,
        subjectId: subject.id
      }
    });
  }

  // Create SubjectStudent relations (enroll each student to each subject in this semester)
  const allStudents = await prisma.student.findMany();
  for (const student of allStudents) {
    for (const subject of allSubjects) {
      await prisma.subjectStudent.create({
        data: {
          subject_id: subject.id,
          student_id: student.id,
          semester_id: semester.id,
          score: Math.floor(Math.random() * 100),
          grade: (Math.random() * 4 + 1).toFixed(2),
          status: "enrolled"
        }
      });
    }
  }

  for (const student of allStudents) {
    await prisma.enrollment.create({
      data: {
        student_id: student.id,
        faculty_id: faculty.id,
        major_id: major.id,
        semester_id: semester.id
      }
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
