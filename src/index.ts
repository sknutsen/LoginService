import "reflect-metadata";
import express from "express";
require('dotenv').config()
import { port, __dev__, __prod__ } from "./constants";
import { login } from "./routes/login";
import { register } from "./routes/register";
import { users } from "./handlers/users";
import { User } from "./entities/User";
import { createConnection } from "typeorm";
import { join } from "path";

const main = async () => {
    const conn = await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        database: __prod__ ? 'AuthDB' : __dev__ ? 'AuthDBDev' : 'AuthDBTest',
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        entities: [join(__dirname, "./entities/*.*")],
        logging: !__prod__,
        synchronize: !__prod__,
    });

    const app = express();
    const usersRoute: users = new users();
    const registerRoute: register = new register(usersRoute);
    const loginRoute: login = new login(usersRoute);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/login', (req, res) => {
    const uname: string = req.body.uname;
    const pword: string = req.body.pword;

    const result = loginRoute.login(uname, pword);

    if (result === true) {
        res.status(200).send('Login successful.');
    } else {
        res.status(400).send('Incorrect username or password.');
    }
    });

    app.post('/register', (req, res) => {
    const uname: string = req.body.uname;
    const pword: string = req.body.pword;

    const result: boolean = registerRoute.register(uname, pword);

    if (result === true) {
        res.status(200).send('Registration successful.');
    } else {
        res.status(400).send('User with submitted username already exists.');
    }
    });

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`);
    });
};

main();