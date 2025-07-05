const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics endpoints
 */

/**
 * @swagger
 * /api/dashboard/user-stats:
 *   get:
 *     summary: Get user statistics (Admin, Teacher)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: User statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Admin:
 *                   type: integer
 *                   example: 2
 *                 Teacher:
 *                   type: integer
 *                   example: 5
 */
router.get("/user-stats", dashboardController.getUserStats);

/**
 * @swagger
 * /api/dashboard/student-stats:
 *   get:
 *     summary: Get student statistics (Active, Inactive)
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Student statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Active:
 *                   type: integer
 *                   example: 10
 *                 Inactive:
 *                   type: integer
 *                   example: 3
 */
router.get("/student-stats", dashboardController.getStudentStats);

/**
 * @swagger
 * /api/dashboard/annual-courses/{year}:
 *   get:
 *     summary: Get annual courses by year (or all if year is not provided)
 *     tags: [Dashboard]
 *     parameters:
 *       - in: path
 *         name: year
 *         schema:
 *           type: integer
 *         required: false
 *         description: Year to filter annual courses
 *     responses:
 *       200:
 *         description: List of annual courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   year:
 *                     type: integer
 *                   term:
 *                     type: integer
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                   faculty:
 *                     type: object
 *                   major:
 *                     type: object
 *                   subjects:
 *                     type: array
 *                     items:
 *                       type: object
 *       500:
 *         description: Server error
 */
router.get(
  "/annual-courses/:year",
  dashboardController.getCompareSubjectByYear
);

module.exports = router;
