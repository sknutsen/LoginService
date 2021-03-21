import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { login } from "./login";
import { refreshToken } from "./refreshToken";
import { register } from "./register";

const routes = Router();

routes.post("/login", async (req, res) => {
    const uname: string = req.body.uname;
    const pword: string = req.body.pword;

    const result = await login(res, uname, pword);

    if (!result) {
        res.status(400).send('Incorrect username or password.');
    }

    res.send({ok: true, accessToken: result.accessToken});
});

//routes.post("/logmeout");

//routes.post("/forgot-password");

routes.post("/refresh-token", [isAuth], refreshToken);

routes.post("/register", async (req, res) => {
    const uname: string = req.body.uname;
    const pword: string = req.body.pword;

    console.log(req.body);
    console.log(uname, pword);

    const result: boolean = await register(uname, pword);

    if (result === true) {
        res.status(200).send('Registration successful.');
    } else {
        res.status(400).send('User with submitted username already exists.');
    }
});

export default routes;