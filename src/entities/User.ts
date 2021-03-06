export class User {
    public id: number;
    public uname: string;
    public pword: string;

    constructor(id: number, uname: string, pword: string) {
        this.id = id;
        this.uname = uname;
        this.pword = pword;
    }
}