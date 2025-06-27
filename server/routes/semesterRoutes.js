const express = require('express');
const router = express.Router();
const semesterController = require('../controllers/semesterController');

/**
 * @swagger
 * /semesters:
 *   get:
 *     summary: Get all semesters
 *     tags: [Semesters]
 *     responses:
 *       200:
 *         description: List of semesters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Semester'
 */
router.get('/', semesterController.getSemesters);

/**
 * @swagger
 * /semesters/{id}:
 *   get:
 *     summary: Get a semester by ID
 *     tags: [Semesters]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Semester ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Semester found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Semester'
 *       404:
 *         description: Semester not found
 */
router.get('/:id', semesterController.getSemesterById);

/**
 * @swagger
 * /semesters:
 *   post:
 *     summary: Create a new semester
 *     tags: [Semesters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semester'
 *     responses:
 *       201:
 *         description: Semester created
 *       400:
 *         description: Invalid input
 */
router.post('/', semesterController.createSemester);

/**
 * @swagger
 * /semesters/{id}:
 *   put:
 *     summary: Update a semester by ID
 *     tags: [Semesters]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Semester ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Semester'
 *     responses:
 *       200:
 *         description: Semester updated
 *       400:
 *         description: Invalid input
 */
router.put('/:id', semesterController.updateSemester);

/**
 * @swagger
 * /semesters/{id}:
 *   delete:
 *     summary: Delete a semester by ID
 *     tags: [Semesters]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Semester ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Semester deleted
 *       404:
 *         description: Semester not found
 */
router.delete('/:id', semesterController.deleteSemester);

/**
 * @swagger
 * /semesters/{id}/summary:
 *   get:
 *     summary: Get faculty, major, and total student enroll summary for a semester
 *     tags: [Semesters]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Semester ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Summary of faculties, majors, and total students enrolled for the semester
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 semesterId:
 *                   type: integer
 *                 faculties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       majors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                             studentCount:
 *                               type: integer
 *                 totalStudents:
 *                   type: integer
 *       404:
 *         description: Semester not found
 */
router.get('/summary/:id', semesterController.getSemesterSummary);

/**
 * @swagger
 * /semesters/summary/year/{year}:
 *   get:
 *     summary: Get semester summary by year (faculties, majors, student counts)
 *     tags: [Semesters]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Academic year (e.g., 2024)
 *     responses:
 *       200:
 *         description: Semester summary for the year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year:
 *                   type: integer
 *                 faculties:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       majors:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             name:
 *                               type: string
 *                             studentCount:
 *                               type: integer
 *                 totalStudents:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.get('/summary/year/:year', semesterController.getSemesterSummaryByYear);

/**
 * @swagger
 * /semesters/{year}/subjects/{facultyId}/{majorId}:
 *   get:
 *     summary: Get all subjects for a given year, faculty, and major
 *     tags: [Semesters]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: true
 *         description: Academic year (e.g., 2024)
 *       - in: path
 *         name: facultyId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Faculty ID
 *       - in: path
 *         name: majorId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Major ID
 *     responses:
 *       200:
 *         description: List of subjects for the year, faculty, and major
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year:
 *                   type: integer
 *                 subjects:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subject'
 *       500:
 *         description: Server error
 */
router.get('/:year/subjects/:facultyId/:majorId', semesterController.getSubjectsByYearFacultyMajor);

module.exports = router;