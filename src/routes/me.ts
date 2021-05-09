import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { users } from "../entity_handlers/users";

export const me = async (req: Request, res: Response) => {
    res.status(200);
    return res.send({name: res.locals.payload.userName});
};