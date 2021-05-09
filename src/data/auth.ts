import { sign } from "jsonwebtoken";
import { User } from "../entities/User";

export const createAccessToken = (user: User) => {
    return sign({userId: user.id, userName: user.uname}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60m'});
};

export const createRefreshToken = (user: User) => {
    return sign({userId: user.id, userName: user.uname, tokenVersion: user.tokenVersion}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
};