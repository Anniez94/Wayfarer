// CHECK IF USER IS LOGGED IN
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import client from "../config/database";
dotenv.config();
const secretkey = process.env.secretkey;

/**
 * Simple middleware to authenticate a request based
 * on a token.
 * Pass this middleware to any route that requires authentication
 */

exports.authenticate = (req, res, next) => {
    // Get auth header value
    const token = req.header("Authorization") || req.headers["Authorization"] || req.body.token;
    if (!token) {
        res.json({
            status: "false",
            data: "Token not found"
        });
    } else {
        
        jwt.verify(token, secretkey, (err, decoded) => {
            if (err) {
                const error = new Error("Invalid Token");
                error.statusCode = 401;
                res.json({
                    status: "false",
                    data: "Token incorrect"
                })
            } else {
                req.userData = decoded;
                next();  // Success. Proceed to the next middleware
            }
        });
    }
}
