import { User } from "../entities/User";
import { users } from "../handlers/users";

export class register {
    private u: users;

    constructor(u: users) {
        this.u = u;
    }
    
    /**
     * register - Registers a new user if there is no other user with the same username
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
     * verifyUser - Verifies whether a user with the given username exists
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