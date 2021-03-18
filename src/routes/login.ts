import { compare } from "bcryptjs";
import { Request, response, Response } from "express";
import { createAccessToken, createRefreshToken } from "../data/auth";
import { LoginResponse } from "../wrappers/LoginResponse";
import { sendRefreshToken } from "../data/sendRefreshToken";
import { User } from "../entities/User";
import { Connection } from "typeorm";

/**
 * login - Verifies that the user exists and the password is correct
 */
export const login = async (res: Response, uname: string, pword: string): Promise<LoginResponse> => {
    const user = await User.findOne({where: {uname: uname} });

    if (!user) {
        res.send({ok: false});
        throw new Error("Incorrect username");
    }

    const valid: boolean = await compare(pword, user.pword);

    if (!valid) {
        throw new Error("Incorrect password");
    }

    if (res !== response) {
        sendRefreshToken(res, createRefreshToken(user));
    }

    return {
        accessToken: createAccessToken(user)
    };
};