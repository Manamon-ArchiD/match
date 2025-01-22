import { Entity, Property } from "@mikro-orm/core";
import BaseEntity from "./base.entity";

@Entity()
export class Match extends BaseEntity {

    @Property()
    userId! : number;
}
/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the match
 *         userId:
 *           type: number
 *           description: User Id of the match
 *       required:
 *         - id
 *       example:
 *         id: "12345"
 */
