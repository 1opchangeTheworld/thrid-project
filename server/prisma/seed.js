const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');


async function main() {
  // Faculties
  const engineering = await prisma.faculty.create({ data: { name: "Engineering" } });
  const science = await prisma.faculty.create({ data: { name: "Science" } });

  // Majors
  const computer = await prisma.major.create({ data: { name: "Computer Engineering", faculty_id: engineering.id } });
  const chemical = await prisma.major.create({ data: { name: "Chemical Engineering", faculty_id: engineering.id } });
  const biology = await prisma.major.create({ data: { name: "Biology", faculty_id: science.id } });

  const hashedPassword = await bcrypt.hash("P@ssw0rd", 10);

  // Students
  await prisma.student.createMany({
    data: [
      {
        student_id: "100000000001",
        password: hashedPassword,
        title_th: "นาย",
        firstname_th: "Somchai",
        lastname_th: "Jaidee",
        telephone: "0811111111",
        faculties_id: engineering.id,
        majors_id: computer.id,
        certificate: "CertA",
        profile_img: "",
        email: "somchai@example.com",
        actives: true
      },
      {
        student_id: "100000000002",
        password: hashedPassword,
        title_th: "นางสาว",
        firstname_th: "Suda",
        lastname_th: "Dee",
        telephone: "0822222222",
        faculties_id: science.id,
        majors_id: biology.id,
        certificate: "CertB",
        profile_img: "",
        email: "suda@example.com",
        actives: true
      }
    ]
  });

  // Users
  await prisma.user.createMany({
    data: [
      {
        username: "admin",
        password: hashedPassword,
        firstname: "Admin",
        lastname: "User",
        telephone: "0999999999",
        email: "admin@example.com",
        faculties_id: engineering.id,
        majors_id: computer.id,
        profile_img: "",
        role: "Admin",
        actives: true
      },
      {
        username: "teacher1",
        password: hashedPassword,
        firstname: "Teacher",
        lastname: "One",
        telephone: "0888888888",
        email: "teacher1@example.com",
        faculties_id: engineering.id,
        majors_id: chemical.id,
        profile_img: "",
        role: "Teacher",
        actives: true
      }
    ]
  });

  // Create 5 SubGroups
  const subGroups = [];
  for (let i = 0; i < 5; i++) {
    const sg = await prisma.subGroup.create({
      data: {
        name: `Group ${String.fromCharCode(65 + i)}`,
        actives: true
      }
    });
    subGroups.push(sg);
  }

  // Subjects (assign each subject to a SubGroup)
  const subjects = [];
  for (let i = 1; i <= 22; i++) {
    const subj = await prisma.subject.create({
      data: {
        id: `SUBJ${i.toString().padStart(3, "0")}`,
        facultiesId: i % 2 === 0 ? engineering.id : science.id,
        subId: `ENG${100 + i}`,
        subName: `Subject ${i}`,
        subUnit: 3,
        subGroupId: subGroups[i % 5].id, // assign to one of the 5 subgroups
        type: i <= 11 ? "BASE" : "TRANSFER",
        majorId: i % 3 === 0 ? chemical.id : computer.id,
        actives: true
      }
    });
    subjects.push(subj);
  }

  // Annual Courses
  const annualCourse = await prisma.annualCourse.create({
    data: {
      year: 2025,
      term: 1,
      startDate: new Date("2025-06-01"),
      endDate: new Date("2025-10-01"),
      facultyId: engineering.id,
      majorId: computer.id
    }
  });

  // AnnualCourseSubject: 10 BASE, 12 TRANSFER
  let acsData = [];
  for (let i = 0; i < 10; i++) {
    acsData.push({
      annualCourseId: annualCourse.id,
      subjectId: subjects[i].id,
      type: "BASE"
    });
  }
  for (let i = 10; i < 22; i++) {
    acsData.push({
      annualCourseId: annualCourse.id,
      subjectId: subjects[i].id,
      type: "TRANSFER"
    });
  }
  await prisma.annualCourseSubject.createMany({ data: acsData });
}

main()
  .then(() => {
    console.log("Seed completed.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });