require('dotenv').config()
import { User } from "../../src/entities/User";
import { register } from "../../src/routes/register";
import { users } from "../../src/entity_handlers/users";
import { Connection, createConnection } from "typeorm";
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
    });
    
    User.clear();

    u = new users();

    const user: User = await User.create({uname: "rusername", pword: "rpassword"}).save();
    const user2: User = await User.create({uname: "rusername2", pword: "rpassword2"}).save();
});

// Test for registering user that does not already exist
// Should be successful
test("register true", async () => {
    const uname: string = "name";
    const pword: string = "password";
    const exists = u.getUserByUname(uname);
    const registered: boolean = await register(uname, pword);

    expect(exists).toBe(false);
    expect(registered).toBe(true);
    expect(await User.find({uname: uname, pword: pword})).toBeDefined();
});

// Test for registering user that already exists
// Should fail
test("register false", async () => {
    const uname: string = "rusername";
    const pword: string = "rpassworda";
    const exists = u.getUserByUname(uname);
    const registered: boolean = await register(uname, pword);
    const ulist: User[] | undefined = await User.find({uname: uname, pword: pword});

    expect(exists).toBeDefined();
    expect(registered).toBe(false);
    expect(ulist[0]).toBeUndefined();
});

afterAll(async () => {
    await conn.close();
});