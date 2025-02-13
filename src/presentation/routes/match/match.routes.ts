import express, { Router } from "express";
import { MatchController } from "../../controllers";

/**
 * @swagger
 * tags:
 *   name: Match
 *   description: Opérations sur les matchs
 */
const router = Router();
router.use(express.urlencoded({ extended: false }))

router.use('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

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
 *             $ref: '#/components/schemas/UpdateMatchDto'
 *     responses:
 *       200:
 *         description: Match updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Match not found
 */
router.put('/:id', MatchController.updateOne)

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
 *             $ref: '#/components/schemas/NewMatchDto'
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
 * /api/match/{matchId}/invite:
 *   post:
 *     summary: Invite a user to a match
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the match
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to invite
 *     responses:
 *       204:
 *         description: Invitation sent successfully
 *       400:
 *         description: User already invited or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User has already been invited to this match"
 *       500:
 *         description: Internal server error
 */
router.post('/:matchId/invite', MatchController.invite);

/**
 * @swagger
 * /api/match/{matchId}/accept:
 *   post:
 *     summary: Accept an invitation to a match
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the match
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *             example:
 *               userId: 123
 *     responses:
 *       204:
 *         description: Invitation accepted successfully
 *       400:
 *         description: User not invited or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User has not been invited to this match"
 *       500:
 *         description: Internal server error
 */
router.post('/:matchId/accept', MatchController.acceptInvite);

/**
 * @swagger
 * /api/match/{matchId}/decline:
 *   post:
 *     summary: Decline an invitation to a match
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the match
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *             example:
 *               userId: 123
 *     responses:
 *       204:
 *         description: Invitation declined successfully
 *       400:
 *         description: User not invited or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User has not been invited to this match"
 *       500:
 *         description: Internal server error
 */
router.post('/:matchId/decline', MatchController.declineInvite);

/**
 * @swagger
 * /api/match/{matchId}/join:
 *   post:
 *     summary: Join a public match by its ID
 *     tags:
 *       - Match
 *     parameters:
 *       - in: path
 *         name: matchId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the match to join
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: The ID of the user joining the match
 *             example:
 *               userId: 123
 *     responses:
 *       204:
 *         description: Successfully joined the public match
 *       400:
 *         description: Match is not public or user already in match
 *         headers:
 *           X-Status-Message:
 *             description: Reason for the error
 *             schema:
 *               type: string
 *               example: "Match is not public"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               examples:
 *                 notPublic:
 *                   summary: Match is not public
 *                   value:
 *                     message: "Match is not public"
 *                 alreadyInMatch:
 *                   summary: User already in match
 *                   value:
 *                     message: "User is already part of this match"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "An unexpected error occurred"
 */
router.post('/:matchId/join', MatchController.joinPublicMatch);

export default router;