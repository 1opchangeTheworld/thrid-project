const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({ where: { actives: true }, include: { major: true, faculty: true } });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

exports.createUser = async (req, res) => {
  const { username, password, actives, ...rest } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        actives: true,
        ...rest,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { actives: false },
    });
    res.json({ message: 'User deactivated', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


