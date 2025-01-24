import { Entity, Enum, Property } from "@mikro-orm/core";
import BaseEntity from "./base.entity";
import { MatchStatus } from "../presentation/enums";



@Entity()
export class Match extends BaseEntity {

    @Property({ type: 'json', nullable: false })
    userIds! : number[];

    @Property({ type: 'int', nullable: true })
    winnerId?: number;

    @Property({ type: 'json', nullable: true })
    pendingInvitations: number[] = [];


    @Property({ type: 'boolean', nullable: false })
    isPublic: boolean = false;

    @Enum({ items: () => MatchStatus, default: MatchStatus.CREATED, nullable: false })
    status: MatchStatus = MatchStatus.CREATED;


    @Property({ type: 'datetime', nullable: false, defaultRaw: 'now()' })
    createdAt: Date = new Date();


    @Property({ type: 'datetime', nullable: true })
    finishedAt?: Date;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the match
 *         userIds:
 *           type: array
 *           items:
 *             type: number
 *           description: List of user IDs associated with the match
 *         winnerId:
 *           type: number
 *           nullable: true
 *           description: The ID of the winner if the match is finished
 *         pendingInvitations:
 *           type: array
 *           items:
 *             type: number
 *           description: List of user IDs who have pending invitations to join the match
 *         isPublic:
 *           type: boolean
 *           description: Indicates if the match is public
 *         status:
 *           type: string
 *           enum:
 *             - CREATED
 *             - PENDING
 *             - ENDED
 *           description: The current status of the match
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the match was created
 *         finishedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: The date and time when the match finished, if applicable
 *       required:
 *         - id
 *         - userIds
 *         - isPublic
 *         - status
 *         - createdAt
 *       example:
 *         id: 1
 *         userIds: [1, 2, 3]
 *         winnerId: 2
 *         pendingInvitations: [4]
 *         isPublic: true
 *         status: "PENDING"
 *         createdAt: "2025-01-24T12:00:00Z"
 *         finishedAt: "2025-01-25T14:30:00Z"
 */

