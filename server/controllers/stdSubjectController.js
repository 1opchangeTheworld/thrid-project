const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createSubject = async (req, res) => {
  try {
    const subject = await prisma.subject.create({
      data: req.body,
    });
    res.status(201).json({
      message: '✅ Subject created successfully',
      data: subject,
    });
  } catch (error) {
    res.status(400).json({
      message: '❌ Failed to create subject',
      error: error.message,
    });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.status(200).json({
      message: '✅ Subjects retrieved successfully',
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Failed to retrieve subjects',
      error: error.message,
    });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await prisma.subject.findUnique({
      where: { id: req.params.id },
    });

    if (!subject) {
      return res.status(404).json({
        message: '❌ Subject not found',
      });
    }

    res.status(200).json({
      message: '✅ Subject retrieved successfully',
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      message: '❌ Failed to retrieve subject',
      error: error.message,
    });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const subject = await prisma.subject.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.status(200).json({
      message: '✅ Subject updated successfully',
      data: subject,
    });
  } catch (error) {
    res.status(400).json({
      message: '❌ Failed to update subject',
      error: error.message,
    });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    await prisma.subject.delete({
      where: { id: req.params.id },
    });

    res.status(200).json({
      message: '✅ Subject deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: '❌ Failed to delete subject',
      error: error.message,
    });
  }
};
