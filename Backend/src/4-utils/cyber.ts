import { Request } from "express";
import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../2-models/client-errors";
import crypto from "crypto";


const secretKey = "BookingProject3";

function createToken(user: UserModel): string {
    delete user.password;

    const container = { user };
    const options = { expiresIn: "30d" }
    const token = jwt.sign(container, secretKey, options);

    return token;
}

async function verifyToken(request: Request): Promise<UserModel> {
    return new Promise((resolve, reject) => {
        const header = request.header("authorization");
        if (!header) reject(new UnauthorizedError("Unauthorized"));

        const token = header.replace("Bearer ", "");
        if (!token) reject(new UnauthorizedError("Missing Token"));

        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {
            if (err) {
                reject(new UnauthorizedError("Invalid token"));
            }
            resolve(container.user);
        });
    })
}

function hashPassword(plainText: string): string {
    const salt = "TheBestBookingSite3";
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}


export default {
    createToken,
    verifyToken,
    hashPassword
}