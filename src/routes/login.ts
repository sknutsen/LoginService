import { User } from "../entities/User";
import { users } from "../handlers/users";

export class login {
    private u: users;

    constructor(u: users) {
        this.u = u;
    }

    /**
     * login - Verifies that the user exists and the password is correct
     */
    public async login(uname: string, pword: string): Promise<boolean> {
        const ulist: User[] = await this.u.getUsers();
        let result: boolean = false;

        for (let i: number = 0; i < ulist.length; i++) {
            result = ulist[i].uname.toLowerCase() === uname.toLowerCase() && ulist[i].pword === pword;
            if (result) {
                break;
            }
        }

        return result;
    }
}