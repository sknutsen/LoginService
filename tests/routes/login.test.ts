import { User } from "../../src/entities/User";
import { login } from "../../src/routes/login";
import { users } from "../../src/handlers/users";

let a: login;
let u: users;

beforeEach(() => {
    u = new users();
    a = new login(u);
    
    const user: User = new User(0, "sondre", "lol");
    u.postUser(user);
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