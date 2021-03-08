require('dotenv').config()
import { User } from "../../src/entities/User";
import { register } from "../../src/routes/register";
import { users } from "../../src/handlers/users";
import { Connection, createConnection } from "typeorm";
import { join } from "path";

let a: register;
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
    });

    u = new users(conn);
    a = new register(u);
    
    User.clear();

    const user: User = await User.create({uname: "rusername", pword: "rpassword"}).save();
    const user2: User = await User.create({uname: "rusername2", pword: "rpassword2"}).save();
});

// Test for registering user that does not already exist
// Should be successful
test("register true", async () => {
    const uname: string = "name";
    const pword: string = "password";
    const exists: boolean = await a.userExists(uname);
    const registered: boolean = await a.register(uname, pword);

    expect(exists).toBe(false);
    expect(registered).toBe(true);
    expect(await User.find({uname: uname, pword: pword})).toBeDefined();
});

// Test for registering user that already exists
// Should fail
test("register false", async () => {
    const uname: string = "rusername";
    const pword: string = "rpassworda";
    const exists: boolean = await a.userExists(uname);
    const registered: boolean = await a.register(uname, pword);
    const u: User[] | undefined = await User.find({uname: uname, pword: pword});

    expect(exists).toBe(true);
    expect(registered).toBe(false);
    expect(u[0]).toBeUndefined();
});

// Test for checking if a pre-existing user is found
// Should be found
test("userExists true", async () => {
    const uname: string = "rusername";
    const verified: boolean = await a.userExists(uname);
    const ulist: User[] = await u.getUsers();

    expect(verified).toBe(true);
    expect(ulist.find((e) => e.uname === uname)).toBeDefined();
});

// Test for checking if a nonexistant user is found
// Should not be found
test("userExists false", async () => {
    const uname: string = "notusername";
    const verified: boolean = await a.userExists(uname);
    const ulist: User[] = await u.getUsers();

    expect(verified).toBe(false);
    expect(ulist.find((e) => e.uname === uname)).toBeUndefined();
});

afterAll(async () => {
    await conn.close();
});