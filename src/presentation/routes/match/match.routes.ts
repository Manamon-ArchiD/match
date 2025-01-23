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

/**
 * @swagger
 * /api/match/user:
 *   get:
 *     summary: Get matches for a user
 *     tags:
 *       - Match
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: List of user matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 */
router.get('/user', MatchController.getUserMatches)

/**
 * @swagger
 * /api/match/{id}:
 *   delete:
 *     summary: Delete a match
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID
 *     responses:
 *       200:
 *         description: Match deleted
 *       404:
 *         description: Match not found
 */
router.delete('/:id', MatchController.deleteMatch)

router.use(express.urlencoded({ extended: false }))
export default router;