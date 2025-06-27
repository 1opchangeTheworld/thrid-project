const prisma = require('../prismaClient');

exports.getFaculties = async (req, res) => {
  const faculties = await prisma.faculty.findMany({include: { majors: true } });
  res.json(faculties);
};

exports.getFacultyById = async (req, res) => {
  const faculty = await prisma.faculty.findUnique({ where: { id: parseInt(req.params.id) } });
  faculty ? res.json(faculty) : res.status(404).json({ error: 'Faculty not found' });
};

exports.createFaculty = async (req, res) => {
  try {
    const faculty = await prisma.faculty.create({ data: req.body });
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await prisma.faculty.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await prisma.faculty.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Faculty deleted', faculty });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};