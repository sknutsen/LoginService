import { User } from "../../src/entities/User";
import { users } from "../../src/handlers/users";

let u: users;

beforeEach(() => {
    u = new users();
    
    const user: User = new User(1, "username", "password");
    u.postUser(user);
});

test('getUsers positive test', () => {
    const list: User[] = u.getUsers();

    expect(list).toBeDefined();
    expect(list.length).toBeGreaterThan(0);
});

test('getUser positive test', () => {
    const user: User | undefined = u.getUser(1);

    expect(user).toBeDefined();
});

test('putUser positive test', () => {
    const uname: string = "";
    const pword: string = "";

    const user: User = new User(1, uname, pword);
    const newUser: User | undefined = u.putUser(user.id, user);
    const ulist: User[] = u.getUsers();

    expect(newUser).toBeDefined();
    if (newUser !== undefined) {
        expect(newUser.id).toBeGreaterThan(0);
        expect(newUser.uname).toBe(user.uname);
        expect(newUser.pword).toBe(user.pword);
        expect(ulist.includes(newUser)).toBe(true);
    }
});

test('postUser positive test', () => {
    const user: User = new User(0, "", "");
    const newUser: User = u.postUser(user);
    const uget: User | undefined = u.getUser(newUser.id);
    const ulist: User[] = u.getUsers();

    expect(newUser).toBeDefined();
    if (newUser !== undefined) {
        expect(newUser.id).toBeGreaterThan(0);
        expect(newUser.uname).toBe(user.uname);
        expect(newUser.pword).toBe(user.pword);
        expect(ulist.includes(newUser)).toBe(true);
    }
    
    expect(uget).toBeDefined();
    if (uget !== undefined) {
        expect(uget.id).toBe(newUser.id);
        expect(uget.uname).toBe(newUser.uname);
        expect(uget.pword).toBe(newUser.pword);
        expect(ulist.includes(uget)).toBe(true);
    }
});

test('deleteUser positive test', () => {
    const deletedUser: User | undefined = u.deleteUser(1);
    const ulist: User[] = u.getUsers();

    expect(deletedUser).toBeDefined();

    deletedUser !== undefined ? expect(ulist.includes(deletedUser)).toBe(false) : fail();
});

test('clearList', () => {
    const ulist: User[] = u.getUsers();
    u.clearList();
    const clearList: User[] = u.getUsers();

    expect(clearList.length).toBe(0);
    expect(ulist.length).toBeGreaterThan(clearList.length);
});