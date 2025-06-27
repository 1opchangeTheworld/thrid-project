const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Subject management
 */

/**
 * @swagger
 * /api/subjects:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, facultiesId, subId, subName, subUnit, subGroup]
 *             properties:
 *               id:
 *                 type: string
 *               facultiesId:
 *                 type: integer
 *               subId:
 *                 type: string
 *               subName:
 *                 type: string
 *               subUnit:
 *                 type: number
 *               subGroup:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Subject created
 */
router.post('/', subjectController.createSubject);

/**
 * @swagger
 * /api/subjects:
 *   get:
 *     summary: Get all subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: A list of subjects
 */
router.get('/', subjectController.getAllSubjects);

/**
 * @swagger
 * /api/subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject data
 *       404:
 *         description: Subject not found
 */
router.get('/:id', subjectController.getSubjectById);

/**
 * @swagger
 * /api/subjects/{id}:
 *   put:
 *     summary: Update a subject
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subName:
 *                 type: string
 *               subUnit:
 *                 type: number
 *               subGroup:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Subject updated
 */
router.put('/:id', subjectController.updateSubject);

/**
 * @swagger
 * /api/subjects/{id}:
 *   delete:
 *     summary: Delete a subject
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Subject deleted
 */
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;
