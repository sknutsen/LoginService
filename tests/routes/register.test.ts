import { User } from "../../src/entities/User";
import { register } from "../../src/routes/register";
import { users } from "../../src/handlers/users";

let a: register;
let u: users;

beforeEach(() => {
    u = new users();
    a = new register(u);
    
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

test("userExists", () => {
    const uname: string = "sondre";
    const verified: boolean = a.userExists(uname);
    const ulist: User[] = u.getUsers();

    expect(verified).toBe(true);
    expect(ulist.find((e) => e.uname === uname)).toBeDefined();
});