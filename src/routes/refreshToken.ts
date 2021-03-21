import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "../data/auth";
import { sendRefreshToken } from "../data/sendRefreshToken";
import { users } from "../entity_handlers/users";

export const refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies.lid;
    if (!token) {
        console.log(`no lid cookie ${req.cookies.lid}`);
        return res.send({ok: false, accessToken: ''});
    }
    
    let payload: any = null;

    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
        console.log(error);
        return res.send({ok: false, accessToken: ''});
    }

    const u: users = new users();

    const user = await u.getUser(payload.userId);

    if (!user) {
        console.log(`no user with id ${payload.userId}`);
        return res.send({ok: false, accessToken: ''});
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ok: true, accessToken: createAccessToken(user)});
};