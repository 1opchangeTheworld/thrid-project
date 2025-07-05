const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getStudentTransfer = async (req, res) => {
  console.log("Fetching StudentTransfer with ID:", req.params.id);
  const { id } = req.params;

  const transfer = await prisma.studentTransfer.findUnique({
    where: { id: Number(id) },
    include: {
      annualCourse: {
        include: {
          subjects: {
            include: {
              subject: {
                include: {
                  subGroup: true,
                },
              },
            },
          },
        },
      },
      grades: {
        include: {
          subject: true,
        },
      },
    },
  });

  if (!transfer) {
    return res.status(404).json({ error: "StudentTransfer not found" });
  }

  res.json(transfer);
};
