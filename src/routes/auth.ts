import { User } from "../../src/entities/User";
import { users } from "../../src/routes/users";

export class auth {
    private u: users;

    constructor(u: users) {
        this.u = u;
    }
    
    /**
     * register
     */
    public register(uname: string, pword: string): boolean {
        let result: boolean = false;

        if (this.userExists(uname) === false) {
            const user = new User(0, uname, pword);
            this.u.postUser(user);
            result = true;
        }

        return result;
    }

    /**
     * login
     */
    public login(uname: string, pword: string): boolean {
        const ulist: User[] = this.u.getUsers();
        let result: boolean = false;

        for (let i: number = 0; i < ulist.length; i++) {
            result = ulist[i].uname.toLowerCase() === uname.toLowerCase() && ulist[i].pword === pword;
            if (result) {
                break;
            }
        }

        return result;
    }

    /**
     * verifyUser
     */
    public userExists(uname: string): boolean {
        const ulist: User[] = this.u.getUsers();
        let result: boolean = false;

        for (let i: number = 0; i < ulist.length; i++) {
            result = ulist[i].uname.toLowerCase() === uname.toLowerCase();
            if (result) {
                break;
            }
        }

        return result;
    }
}