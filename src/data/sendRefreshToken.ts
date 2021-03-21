import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("lid", token, {
        httpOnly: true,
        path: "/refresh-token"
    });
};