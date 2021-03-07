import { User } from "../entities/User";

export class users {
    private userList: User[] = [];

    /**
     * getUsers - Gets an array of all the users
     */
    public getUsers(): User[] {
        let result: User[] = this.userList;
        return result;
    }

    /**
     * getUser - Gets the user with the specified id
     */
    public getUser(id: number): User | undefined {
        let result: User | undefined = this.userList.find((e) => e.id === id);

        return result;
    }

    /**
     * putUser - Updates the data of the user with the specified id
     */
    public putUser(id: number, user: User): User | undefined {
        let result: User | undefined;

        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].id === id) {
                this.userList[i].pword = user.pword;
                this.userList[i].uname = user.uname;

                result = this.userList[i];
            }
        }

        return result;
    }

    /**
     * postUser - Creates a new user with a unique id
     */
    public postUser(user: User): User {
        const sortedList = this.userList.sort((x, y) => x.id - y.id);

        const elem = sortedList[sortedList.length - 1];
        user.id = elem !== undefined ? elem.id + 1 : 1;
        
        this.userList.push(user);

        console.log(`Created user with id: ${user.id} - uname: ${user.uname} - pword: ${user.pword}`);

        return user;
    }

    /**
     * deleteUser - Deletes the user with the specified id
     */
    public deleteUser(id: number): User | undefined {
        let result: User | undefined;
        let newList: User[] = [];

        for( var i = 0; i < this.userList.length; i++){ 
            if (this.userList[i] !== undefined && this.userList[i].id === id) { 
                //result = this.userList.splice(i, 1)[0];
                result = this.userList[i];
                continue; 
            }

            newList.push(this.userList[i]);
        }

        this.userList = newList;

        return result;
    }

    /**
     * clearList - replaces userList with an empty array
     */
    public clearList() {
        this.userList = [];
    }
}