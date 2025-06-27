const { PrismaClient } = require('@prisma/client');

const prisma = global.prisma || new PrismaClient();

if (process.env.PROFILE !== 'prod') global.prisma = prisma;

module.exports = prisma;