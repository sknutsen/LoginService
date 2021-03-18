import { Connection } from "typeorm";
import { hash, compare } from "bcryptjs";
import { User } from "../entities/User";

export class users {
    /**
     * getUsers - Gets an array of all the users
     */
    public async getUsers(): Promise<User[]> {
        const result: User[] = await User.find();
        
        return result;
    }

    /**
     * getUser - Gets the user with the specified id
     */
    public async getUser(id: number): Promise<User | undefined> {
        let result: User | undefined = await User.findOne({id: id});

        return result;
    }

    /**
     * getUserByUname - Gets the user with the specified uname
     */
    public async getUserByUname(uname: string): Promise<User | undefined> {
        let result: User | undefined = await User.findOne({uname: uname});

        return result;
    }

    /**
     * putUser - Updates the data of the user with the specified id
     */
    public async putUser(id: number, user: User): Promise<User | undefined> {
        const usr = await this.getUser(id);

        if (!usr) {
            throw new Error("No user with given id");
        }
        
        const valid = compare(usr.pword, user.pword)
        
        if (!valid) {
            const pwordHash = await hash(user.pword, 11);
            user.pword = pwordHash;
        }

        await User.update(id, {uname: user.uname, pword: user.pword, tokenVersion: user.tokenVersion});

        let result = this.getUser(id);

        return result;
    }

    /**
     * postUser - Creates a new user with a unique id
     */
    public async postUser(uname: string, pword: string): Promise<User> {
        const pwordHash = await hash(pword, 11);

        const result: User = await User.create({uname: uname, pword: pwordHash, tokenVersion: 0}).save();

        return result;
    }

    /**
     * deleteUser - Deletes the user with the specified id
     */
    public async deleteUser(id: number): Promise<User | undefined> {
        let result: User | undefined = await User.findOne(id);

        if (result !== undefined) {
            await User.remove(result);
        }

        return result;
    }
}