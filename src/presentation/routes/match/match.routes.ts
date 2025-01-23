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
 * /api/match/{id}:
 *   get:
 *     summary: Get a match
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
 *         description: Match found
 *       404:
 *         description: Match not found
 */
router.get('/:id', MatchController.getOne)

/**
 * @swagger
 * /api/match/{id}:
 *   put:
 *     summary: Update a match
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The match ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       200:
 *         description: Match updated successfully
 *       404:
 *         description: Match not found
 */
router.put('/:id', MatchController.getAll) // TODO

/**
 * @swagger
 * /api/match:
 *   post:
 *     summary: Add given match
 *     tags:
 *       - Match
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Match'
 *     responses:
 *       201:
 *         description: The match was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Match'
 */
router.post('', MatchController.createOne);

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

/**
 * @swagger
 * /api/match/:matchId/invite:
 *   post:
 *     summary: Invite given players to a match using their ID
 *     tags:
 *       - Match
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *     responses:
 *       200:
 *         description: Users successfully invited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Match'
 */
router.post(':matchId/invite', MatchController.getAll); // TODO

/**
 * @swagger
 * /api/match/:matchId/accept:
 *   post:
 *     summary: Accept the invitation to the match in path
 *     tags:
 *       - Match
 *     responses:
 *       200:
 *         description: Invitation accepted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Match'
 */
router.post(':matchId/accept', MatchController.getAll); // TODO

/**
 * @swagger
 * /api/match/:matchId/decline:
 *   post:
 *     summary: Decline the invitation to the match in path
 *     tags:
 *       - Match
 *     responses:
 *       204:
 *         description: Invitation declined successfully
 */
router.post(':matchId/decline', MatchController.getAll); // TODO

/**
 * @swagger
 * /api/match/:matchId/join:
 *   post:
 *     summary: Join the public match given in path
 *     tags:
 *       - Match
 *     responses:
 *       200:
 *         description: Match successfully joined
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Match'
 */
router.post(':matchId/join', MatchController.getAll); // TODO

router.use(express.urlencoded({ extended: false }))
export default router;