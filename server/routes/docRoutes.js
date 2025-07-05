const express = require("express");
const router = express.Router();
const docController = require("../controllers/docController");

/**
 * @swagger
 * /api/doc/transcript:
 *   get:
 *     summary: Generate transcript comparison PDF
 *     tags:
 *       - Document
 *     produces:
 *       - application/pdf
 *     responses:
 *       200:
 *         description: PDF file generated
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get("/transcript", docController.generateTranscriptPDF);

module.exports = router;
