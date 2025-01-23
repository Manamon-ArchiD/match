import { Entity, Property } from "@mikro-orm/core";
import BaseEntity from "./base.entity";

@Entity()
export class Match extends BaseEntity {

    @Property({ type: 'json', nullable: false })
    userIds! : number[];


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

