import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity({ abstract: true })
export default class BaseEntity {

    @PrimaryKey()
    id!: number;

}