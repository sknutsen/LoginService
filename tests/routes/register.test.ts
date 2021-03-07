import { User } from "../../src/entities/User";
import { register } from "../../src/routes/register";
import { users } from "../../src/handlers/users";

let a: register;
let u: users;

beforeEach(() => {
    u = new users();
    a = new register(u);
    
    const user: User = new User(0, "username", "password");
    u.postUser(user);
});

// Test for registering user that does not already exist
// Should be successful
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

// Test for registering user that already exists
// Should fail
test("register false", () => {
    const uname: string = "username";
    const pword: string = "password2";
    const exists: boolean = a.userExists(uname);
    const registered: boolean = a.register(uname, pword);
    const ulist: User[] = u.getUsers();

    expect(exists).toBe(true);
    expect(registered).toBe(false);
    expect(ulist.find((e) => e.uname === uname && e.pword === pword)).toBeUndefined();
});

// Test for checking if a pre-existing user is found
// Should be found
test("userExists true", () => {
    const uname: string = "username";
    const verified: boolean = a.userExists(uname);
    const ulist: User[] = u.getUsers();

    expect(verified).toBe(true);
    expect(ulist.find((e) => e.uname === uname)).toBeDefined();
});

// Test for checking if a nonexistant user is found
// Should not be found
test("userExists false", () => {
    const uname: string = "notusername";
    const verified: boolean = a.userExists(uname);
    const ulist: User[] = u.getUsers();

    expect(verified).toBe(false);
    expect(ulist.find((e) => e.uname === uname)).toBeUndefined();
});