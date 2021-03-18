import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'];
    
    if (!auth) {
        throw new Error("Not authenticated");
    }

    try {
        const token = auth.split(' ')[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.locals.payload = payload;
    } catch (error) {
        console.log(error);
        throw new Error("Not authenticated");
    }

    return next();
};