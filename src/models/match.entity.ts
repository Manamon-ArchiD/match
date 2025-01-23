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
 *       required:
 *         - id
 *         - userIds
 *       example:
 *          id: 1
 *          userIds: [1, 2, 3]
 */

