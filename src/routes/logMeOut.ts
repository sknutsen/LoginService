import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { revokeRefreshToken } from "../data/revokeRefreshToken";
import { users } from "../entity_handlers/users";

export const logMeOut = async (req: Request, res: Response) => {
    const token = req.cookies.lid;
    if (!token) {
        console.log(`no lid cookie ${req.cookies.lid}`);
        res.status(400);
        return res.send({ok: false, accessToken: ''});
    }
    
    let payload: any = null;

    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
        console.log(error);
        res.status(400);
        return res.send({ok: false, accessToken: ''});
    }

    const u: users = new users();

    const user = await u.getUser(payload.userId);

    if (!user) {
        console.log(`no user with id ${payload.userId}`);
        res.status(400);
        return res.send({ok: false, accessToken: ''});
    }

    revokeRefreshToken(user);

    res.status(200);

    return res.send({ok: true, accessToken: ''});
};