import jwt, { SignOptions } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.AI_RECRUITE_JWT_ACCESS_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.AI_RECRUITE_JWT_REFRESH_SECRET as string;

const ACCESS_TOKEN_EXPIRES_IN = (process.env.AI_RECRUITE_ACCESS_TOKEN_EXPIRES_IN || "15m") as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRES_IN = (process.env.AI_RECRUITE_REFRESH_TOKEN_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

export interface TokenPayload {
    user_id: string;
    email: string;
    role: string;
    isOnboarded?: boolean;
}

// Access Token তৈরি
export const generateAccessToken = (payload: TokenPayload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
};

// Refresh Token তৈরি
export const generateRefreshToken = (payload: TokenPayload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
};

// Access Token ভেরিফাই করা
export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
};

// নিরাপদ Access Token ভেরিফিকেশন (ব্যর্থ হলে null রিটার্ন করবে)
export const safeVerifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
    } catch {
        return null;
    }
};

// Refresh Token ভেরিফাই করা
export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};

// নিরাপদ Refresh Token ভেরিফিকেশন (ব্যর্থ হলে null রিটার্ন করবে)
export const safeVerifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
    } catch {
        return null;
    }
};
