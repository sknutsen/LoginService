import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column("text")
    public uname: string;

    @Column("text")
    public pword: string;

    constructor(id: number, uname: string, pword: string) {
        super();
        this.id = id;
        this.uname = uname;
        this.pword = pword;
    }
}