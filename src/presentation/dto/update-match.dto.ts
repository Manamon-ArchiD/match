import { MatchStatus } from "../enums";

export interface UpdateMatchDto {
    status: MatchStatus
}
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateMatchDto:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [CREATED, PENDING, ENDED]
 */