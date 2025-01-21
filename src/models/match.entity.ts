import { Entity } from "@mikro-orm/core";
import BaseEntity from "./base.entity";

@Entity()
export class Match extends BaseEntity {

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
 *       required:
 *         - id
 *       example:
 *         id: "12345"
 */
