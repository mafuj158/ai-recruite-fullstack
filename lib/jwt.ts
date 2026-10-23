import jwt, { SignOptions } from "jsonwebtoken"

const ACCESS_TOKEN_SECRET = process.env.AI_RECRUITE_JWT_ACCESS_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.AI_RECRUITE_JWT_REFRESH_SECRET as string;

const ACCESS_TOKEN_EXPIRES_IN = (process.env.AI_RECRUITE_ACCESS_TOKEN_EXPIRES_IN || "15m") as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRES_IN = (process.env.AI_RECRUITE_REFRESH_TOKEN_EXPIRES_IN || "7d") as SignOptions["expiresIn"];


export interface TokenPayload {
    user_id: string;
    email: string;
}


// Access Token তৈরি (যেমন: ১ দিন মেয়াদ)

export const generateAccessToken = (payload: TokenPayload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
}

// Refresh Token তৈরি (যেমন: ৭ দিন মেয়াদ)

export const generateRefreshToken = (payload: TokenPayload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
}

// Access Token ভেরিফাই করা

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

// Refresh Token ভেরিফাই করা

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
}