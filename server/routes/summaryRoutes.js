const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summaryController");

/**
 * @swagger
 * /api/summary/{id}:
 *   get:
 *     summary: Get StudentTransfer summary with grades and subject info
 *     tags:
 *       - Summary
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: StudentTransfer ID
 *     responses:
 *       200:
 *         description: StudentTransfer summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 studentId:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 annualCourse:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     year:
 *                       type: integer
 *                     term:
 *                       type: integer
 *                     subjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subjectId:
 *                             type: string
 *                           subject:
 *                             type: object
 *                             properties:
 *                               subId:
 *                                 type: string
 *                               subName:
 *                                 type: string
 *                               subUnit:
 *                                 type: number
 *                               subGroup:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                   name:
 *                                     type: string
 *                 grades:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       subjectId:
 *                         type: string
 *                       grade:
 *                         type: number
 *                       subject:
 *                         type: object
 *                         properties:
 *                           subId:
 *                             type: string
 *                           subName:
 *                             type: string
 *       404:
 *         description: StudentTransfer not found
 */
router.get("/:id", summaryController.getStudentTransfer);

module.exports = router;
