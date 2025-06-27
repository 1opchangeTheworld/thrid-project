const express = require('express');
const router = express.Router();
const stdStudentController = require('../controllers/stdSubjectController');

/**
 * @swagger
 * tags:
 *   name: SubjectStudents
 *   description: Student enrollments in subjects
 */

/**
 * @swagger
 * /api/subject-students:
 *   get:
 *     summary: Get all subject-student records
 *     tags: [SubjectStudents]
 *     responses:
 *       200:
 *         description: List of subject-student records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:         { type: integer }
 *                   subject_id: { type: string }
 *                   student_id: { type: integer }
 *                   score:      { type: number }
 *                   grade:      { type: string }
 *                   status:     { type: string }
 */
router.get('/', stdStudentController.getAllSubjects);

/**
 * @swagger
 * /api/subject-students/{id}:
 *   get:
 *     summary: Get a subject-student record by ID
 *     tags: [SubjectStudents]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: SubjectStudent ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record found
 *       404:
 *         description: Record not found
 */
router.get('/:id', stdStudentController.getSubjectById);

/**
 * @swagger
 * /api/subject-students:
 *   post:
 *     summary: Enroll a student in a subject
 *     tags: [SubjectStudents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject_id
 *               - student_id
 *             properties:
 *               subject_id:
 *                 type: string
 *                 example: C10001
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               score:
 *                 type: number
 *                 example: 85.5
 *               grade:
 *                 type: string
 *                 example: B+
 *               status:
 *                 type: string
 *                 example: enrolled
 *     responses:
 *       201:
 *         description: Enrollment created
 *       400:
 *         description: Invalid input
 */
router.post('/', stdStudentController.createSubject);

/**
 * @swagger
 * /api/subject-students/{id}:
 *   put:
 *     summary: Update a subject-student record
 *     tags: [SubjectStudents]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: SubjectStudent ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 example: 92
 *               grade:
 *                 type: string
 *                 example: A
 *               status:
 *                 type: string
 *                 example: completed
 *     responses:
 *       200:
 *         description: Record updated
 *       400:
 *         description: Invalid input
 */
router.put('/:id', stdStudentController.updateSubject);

/**
 * @swagger
 * /api/subject-students/{id}:
 *   delete:
 *     summary: Delete a subject-student record
 *     tags: [SubjectStudents]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: SubjectStudent ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted
 *       404:
 *         description: Record not found
 */
router.delete('/:id', stdStudentController.deleteSubject);

module.exports = router;
