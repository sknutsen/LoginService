import { User } from "../entities/User";
import { users } from "../entity_handlers/users";

/**
 * register - Registers a new user if there is no other user with the same username
 */
export const register = async (uname: string, pword: string): Promise<boolean> => {
    let result: boolean = false;
    const u: users = new users();

    const user = await u.getUserByUname(uname);

    if (!user) {
        await u.postUser(uname, pword);
        result = true;
    }

    return result;
};