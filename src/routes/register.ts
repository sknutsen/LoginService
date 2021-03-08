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
    public async register(uname: string, pword: string): Promise<boolean> {
        let result: boolean = false;

        if (await this.userExists(uname) === false) {
            await this.u.postUser(uname, pword);
            result = true;
        }

        return result;
    }

    /**
     * verifyUser - Verifies whether a user with the given username exists
     */
    public async userExists(uname: string): Promise<boolean> {
        const ulist: User[] = await this.u.getUsers();
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