const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Try to find user in user table
    let user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      return res.json({ user: req.session.user });
    }

    let student = await prisma.student.findUnique({
      where: { student_id: username },
    });

    if (student) {
      const valid = await bcrypt.compare(password, student.password);
      if (!valid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      req.session.user = {
        id: student.id,
        username: student.student_id,
        role: "Student",
      };
      return res.json({ user: req.session.user });
    }

    // If neither found
    return res.status(401).json({ error: "Invalid credentials" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.authenticate = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
};