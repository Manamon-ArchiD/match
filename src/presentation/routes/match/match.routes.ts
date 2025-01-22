import express, { Router } from "express";
import { MatchController } from "../../controllers";

/**
 * @swagger
 * tags:
 *   name: Match
 *   description: Opérations sur les matchs
 */
const router = Router();

router.use('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

/**
 * @swagger
 * /api/match:
 *   get:
 *     summary: Get all matches
 *     tags:
 *       - Match
 *     responses:
 *       200:
 *         description: List of matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get('', MatchController.getAll);


router.get('/user', MatchController.getUserMatches)

router.use(express.urlencoded({ extended: false }))
export default router;