import { Connection } from "typeorm";
import { User } from "../entities/User";

export class users {
    private conn: Connection;

    constructor(conn: Connection) {
        this.conn = conn;
    }

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
     * putUser - Updates the data of the user with the specified id
     */
    public async putUser(id: number, user: User): Promise<User | undefined> {
        await User.update(id, {uname: user.uname, pword: user.pword});

        let result = this.getUser(id);

        return result;
    }

    /**
     * postUser - Creates a new user with a unique id
     */
    public async postUser(uname: string, pword: string): Promise<User> {
        const result: User = await User.create({uname: uname, pword: pword}).save();

        console.log(`Created user with id: ${result.id} - uname: ${result.uname} - pword: ${result.pword}`);

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