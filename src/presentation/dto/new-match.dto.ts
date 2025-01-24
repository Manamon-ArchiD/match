export interface NewMatchDto {
    invitations:  string[],
    public: boolean,
    userId: string
}
/**
 * @swagger
 * components:
 *   schemas:
 *     NewMatchDto:
 *       type: object
 *       properties:
 *         invitations:
 *           type: array
 *           items:
 *             type: number
 *           description: List of user IDs to invite
 *         public:
 *           type: boolean
 *           description: Indicates if the match should be public
 *         userId:
 *           type: number
 *           description: The current user's ID
 */