require('dotenv').config()
import { User } from "../../src/entities/User";
import { login } from "../../src/routes/login";
import { users } from "../../src/handlers/users";
import { Connection, createConnection } from "typeorm";
import { join } from "path";

let a: login;
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
    a = new login(u);
    
    User.clear();
    
    const user: User = await User.create({uname: "lusername", pword: "lpassword"}).save();
    const user2: User = await User.create({uname: "lusername2", pword: "lpassword2"}).save();
});

// Test for existing user with the associated password
// Should be successful
test("login true", async () => {
    const uname: string = "lusername";
    const pword: string = "lpassword";
    const verified: boolean = await a.login(uname, pword);
    const ulist: User[] = await u.getUsers();

    expect(verified).toBe(true);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeDefined();
});

// Test for existing user with an incorrect password
// Should fail
test("login false 1", async () => {
    const uname: string = "lusername";
    const pword: string = "password";
    const verified: boolean = await a.login(uname, pword);
    const ulist: User[] = await u.getUsers();

    expect(verified).toBe(false);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeUndefined();
});

// Test for nonexistent user with pre-existing password
// Should fail
test("login false 2", async () => {
    const uname: string = "bob";
    const pword: string = "lpassword";
    const verified: boolean = await a.login(uname, pword);
    const ulist: User[] = await u.getUsers();

    expect(verified).toBe(false);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeUndefined();
});

afterAll(async () => {
    await conn.close();
});