require('dotenv').config()
import { Connection, createConnection } from "typeorm";
import { compare } from "bcryptjs";
import { User } from "../../src/entities/User";
import { users } from "../../src/entity_handlers/users";
import { __dev__, __prod__, __test__ } from "../../src/constants";
import { join } from "path";

let u: users;
let conn: Connection;

beforeAll(async () => {
    conn = await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        database: 'AuthDBTest',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [join(__dirname, "../../src/entities/*.*")],
        logging: false,
        synchronize: true,
    },);

    u = new users();
    
    User.clear();
    
    const user: User = await User.create({uname: "username", pword: "password"}).save();
    const user2: User = await User.create({uname: "username2", pword: "password2"}).save();
});

// Test for getting all existing users
// Should return a list of 2 items
test('getUsers positive test', async () => {
    const list: User[] = await u.getUsers();

    expect(list).toBeDefined();
    expect(list.length).toBeGreaterThan(0);
    expect(list.length).toBe(2);
});

// Test for getting the user with id 1
// Should return a user successfully
test('getUser positive test', async () => {
    const puser: User = new User(0, "asdsadasd", "afafaewe");
    const newUser: User = await u.postUser(puser.uname, puser.pword);

    const id: number = newUser.id;
    const user: User | undefined = await u.getUser(id);

    expect(user).toBeDefined();
    user !== undefined ? expect(user.id).toBe(id) : fail();
});

// Test for getting nonexistent user with id 100
// Should fail
test('getUser negative test', async () => {
    const id: number = 9999999;
    const user: User | undefined = await u.getUser(id);

    expect(user).toBeUndefined();
});

// Test for getting the user with id 1
// Should return a user successfully
test('getUserByUname positive test', async () => {
    const puser: User = new User(0, "asdsadasd", "afafaewe");
    const newUser: User = await u.postUser(puser.uname, puser.pword);

    const uname: string = newUser.uname;
    const user: User | undefined = await u.getUserByUname(uname);

    expect(user).toBeDefined();
    user !== undefined ? expect(user.uname).toBe(uname) : fail();
});

// Test for getting nonexistent user with id 100
// Should fail
test('getUserByUname negative test', async () => {
    const uname: string = "bad name";
    const user: User | undefined = await u.getUserByUname(uname);

    expect(user).toBeUndefined();
});

// Test for updating the values of the user with id 1
// Should return the user with the updated values successfully
test('putUser positive test', async () => {
    const puser: User = new User(0, "asdsadaasd", "afafaewde");
    const nUser: User = await u.postUser(puser.uname, puser.pword);

    const uname: string = "newusername";
    const pword: string = "newpassword";
    const id: number = nUser.id;

    const user: User = new User(id, uname, pword);
    const newUser: User | undefined = await u.putUser(user.id, user);
    const samePword: boolean = await compare(pword, newUser.pword);

    expect(newUser).toBeDefined();
    if (newUser !== undefined) {
        expect(newUser.id).toBe(id);
        expect(newUser.uname).toBe(user.uname);
        expect(newUser.pword).not.toBe(user.pword);
        expect(samePword).toBe(true);
        expect(await User.find({uname: newUser.uname, pword: newUser.pword})).toBeDefined();
    } else {
        fail();
    }
});

// Test for creating a new user
// Should return the new user which should also be in the collection
test('postUser positive test', async () => {
    const user: User = new User(0, "user3", "pword3");
    const newUser: User = await u.postUser(user.uname, user.pword);
    const samePword: Boolean = await compare(user.pword, newUser.pword);
    const uget: User | undefined = await u.getUser(newUser.id);

    expect(newUser).toBeDefined();
    if (newUser !== undefined) {
        expect(newUser.uname).toBe(user.uname);
        expect(newUser.pword).not.toBe(user.pword);
        expect(samePword).toBe(true);
        expect(await User.find({uname: newUser.uname, pword: newUser.pword})).toBeDefined();
    } else {
        fail();
    }
    
    expect(uget).toBeDefined();
    if (uget !== undefined) {
        expect(uget.id).toBe(newUser.id);
        expect(uget.uname).toBe(newUser.uname);
        expect(uget.pword).toBe(newUser.pword);
        expect(await User.find({uname: uget.uname, pword: uget.pword})).toBeDefined();
    } else {
        fail();
    }
});

// Test to delete an existing user
// Should return the deleted user and also reduce the size of the collection by 1
test('deleteUser positive test', async () => {
    const puser: User = new User(0, "asdadasd", "afafaewae");
    const newUser: User = await u.postUser(puser.uname, puser.pword);

    const id: number = newUser.id;
    const initlist: User[] = await u.getUsers();
    const deletedUser: User | undefined = await u.deleteUser(id);
    const ulist: User[] = await u.getUsers();

    expect(deletedUser).toBeDefined();

    deletedUser !== undefined ? expect(ulist.includes(deletedUser)).toBe(false) : fail();
    expect(ulist.length).toBeLessThan(initlist.length);
    expect(ulist.length).toBe(initlist.length - 1);
});

// Test to delete a nonexistent user
// Should fail
test('deleteUser negative test', async () => {
    const initlist: User[] = await u.getUsers();
    const deletedUser: User | undefined = await u.deleteUser(9999999);
    const ulist: User[] = await u.getUsers();

    expect(deletedUser).toBeUndefined();
    expect(ulist.length).toBe(initlist.length);
});

afterAll(async () => {
    await conn.close();
});