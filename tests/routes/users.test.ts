import { User } from "../../src/entities/User";
import { users } from "../../src/handlers/users";

let u: users;

beforeEach(() => {
    u = new users();
    
    const user: User = new User(0, "username", "password");
    const user2: User = new User(0, "username2", "password2");
    u.postUser(user);
    u.postUser(user2);
});

// Test for getting all existing users
// Should return a list of 2 items
test('getUsers positive test', () => {
    const list: User[] = u.getUsers();

    expect(list).toBeDefined();
    expect(list.length).toBeGreaterThan(0);
    expect(list.length).toBe(2);
});

// Test for getting the user with id 1
// Should return a user successfully
test('getUser positive test', () => {
    const id: number = 1;
    const user: User | undefined = u.getUser(id);

    expect(user).toBeDefined();
    user !== undefined ? expect(user.id).toBe(id) : fail();
});

// Test for getting nonexistent user with id 100
// Should fail
test('getUser negative test', () => {
    const id: number = 100;
    const user: User | undefined = u.getUser(id);

    expect(user).toBeUndefined();
});

// Test for updating the values of the user with id 1
// Should return the user with the updated values successfully
test('putUser positive test', () => {
    const uname: string = "newusername";
    const pword: string = "newpassword";
    const id: number = 1;

    const user: User = new User(id, uname, pword);
    const newUser: User | undefined = u.putUser(user.id, user);
    const ulist: User[] = u.getUsers();

    expect(newUser).toBeDefined();
    if (newUser !== undefined) {
        expect(newUser.id).toBeGreaterThan(0);
        expect(newUser.id).toBe(id);
        expect(newUser.uname).toBe(user.uname);
        expect(newUser.pword).toBe(user.pword);
        expect(ulist.includes(newUser)).toBe(true);
    } else {
        fail();
    }
});

// Test for creating a new user
// Should return the new user which should also be in the collection
test('postUser positive test', () => {
    const user: User = new User(0, "user3", "pword3");
    const newUser: User = u.postUser(user);
    const uget: User | undefined = u.getUser(newUser.id);
    const ulist: User[] = u.getUsers();

    expect(newUser).toBeDefined();
    if (newUser !== undefined) {
        expect(newUser.id).toBeGreaterThan(0);
        expect(newUser.uname).toBe(user.uname);
        expect(newUser.pword).toBe(user.pword);
        expect(ulist.includes(newUser)).toBe(true);
    } else {
        fail();
    }
    
    expect(uget).toBeDefined();
    if (uget !== undefined) {
        expect(uget.id).toBe(newUser.id);
        expect(uget.uname).toBe(newUser.uname);
        expect(uget.pword).toBe(newUser.pword);
        expect(ulist.includes(uget)).toBe(true);
    } else {
        fail();
    }
});

// Test to delete an existing user
// Should return the deleted user and also reduce the size of the collection by 1
test('deleteUser positive test', () => {
    const initlist: User[] = u.getUsers();
    const deletedUser: User | undefined = u.deleteUser(1);
    const ulist: User[] = u.getUsers();

    expect(deletedUser).toBeDefined();

    deletedUser !== undefined ? expect(ulist.includes(deletedUser)).toBe(false) : fail();
    expect(ulist.length).toBeLessThan(initlist.length);
    expect(ulist.length).toBe(initlist.length - 1);
});

// Test to delete a nonexistent user
// Should fail
test('deleteUser negative test', () => {
    const initlist: User[] = u.getUsers();
    const deletedUser: User | undefined = u.deleteUser(100);
    const ulist: User[] = u.getUsers();

    expect(deletedUser).toBeUndefined();
    expect(ulist.length).toBe(initlist.length);
});

// Test to empty the collection
// Should return and empty array
test('clearList', () => {
    const ulist: User[] = u.getUsers();
    u.clearList();
    const clearList: User[] = u.getUsers();

    expect(clearList.length).toBe(0);
    expect(ulist.length).toBeGreaterThan(clearList.length);
});