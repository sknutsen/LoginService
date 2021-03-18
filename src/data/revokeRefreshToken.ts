import { User } from "../entities/User";
import { users } from "../entity_handlers/users";

export const revokeRefreshToken = async (user: User) => {
    const u: users = new users();

    user.tokenVersion += 1;
    
    await u.putUser(user.id, user);
};