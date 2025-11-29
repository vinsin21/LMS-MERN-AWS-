import argon2 from "argon2";

export const hashToken = async (token) => {
    return await argon2.hash(token);
};

export const verifyTokenHash = async (token, hash) => {
    return await argon2.verify(hash, token);
};
