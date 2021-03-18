import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["uname"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column("text")
    public uname: string;

    @Column("text")
    public pword: string;

    @Column("int")
    public tokenVersion: number;

    constructor(id: number, uname: string, pword: string, tokenVersion?: number) {
        super();
        this.id = id;
        this.uname = uname;
        this.pword = pword;
        this.tokenVersion = tokenVersion ?? 0;
    }
}