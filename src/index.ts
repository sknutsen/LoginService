import express from "express";
require('dotenv').config()
import { port } from "./constants";
import { login } from "./routes/login";
import { register } from "./routes/register";
import { users } from "./handlers/users";

const app = express();
const usersRoute: users = new users();
const registerRoute: register = new register(usersRoute);
const loginRoute: login = new login(usersRoute);

app.post('/login', (req, res) => {
    const uname: string = "";
    const pword: string = "";
    
    loginRoute.login(uname, pword);
});

app.post('/register', (req, res) => {
    const uname: string = "";
    const pword: string = "";
    
    registerRoute.register(uname, pword);
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});