import { User } from "../../src/entities/User";
import { auth } from "../../src/routes/auth";
import { users } from "../../src/routes/users";

let a: auth;
let u: users;

beforeEach(() => {
    u = new users();
    a = new auth(u);
    
    const user: User = new User(0, "sondre", "lol");
    u.postUser(user);
});

test("register true", () => {
    const uname: string = "name";
    const pword: string = "password";
    const exists: boolean = a.userExists(uname);
    const registered: boolean = a.register(uname, pword);
    const ulist: User[] = u.getUsers();

    expect(exists).toBe(false);
    expect(registered).toBe(true);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeDefined();
});

test("register false", () => {
    const uname: string = "sondre";
    const pword: string = "password";
    const exists: boolean = a.userExists(uname);
    const registered: boolean = a.register(uname, pword);
    const ulist: User[] = u.getUsers();

    expect(exists).toBe(true);
    expect(registered).toBe(false);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeUndefined();
});

test("login true", () => {
    const uname: string = "sondre";
    const pword: string = "lol";
    const verified: boolean = a.login(uname, pword);
    const ulist: User[] = u.getUsers();

    expect(verified).toBe(true);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeDefined();
});

test("login false 1", () => {
    const uname: string = "sondre";
    const pword: string = "kek";
    const verified: boolean = a.login(uname, pword);
    const ulist: User[] = u.getUsers();

    expect(verified).toBe(false);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeUndefined();
});

test("login false 2", () => {
    const uname: string = "bob";
    const pword: string = "lol";
    const verified: boolean = a.login(uname, pword);
    const ulist: User[] = u.getUsers();

    expect(verified).toBe(false);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeUndefined();
});

test("userExists", () => {
    const uname: string = "sondre";
    const verified: boolean = a.userExists(uname);
    const ulist: User[] = u.getUsers();

    expect(verified).toBe(true);
    expect(ulist.find((e) => e.uname === uname)).toBeDefined();
})