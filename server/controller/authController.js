import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import client from "../config/database";
import dotenv from 'dotenv';
dotenv.config();
const secretkey = process.env.secretkey;

// Register a user
exports.postLogin = (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({
            status: "failed",
            data: {
                error: "Bad request",
                message: "All fields are required"
            }
        });
    client.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
        if (error)
            return res.status(400).json({
                status: "failed",
                message: error,
            });
         if (result.rows < '1')
            return res.status(400).json({
                status: 'failed',
                data: {
                    message: 'User not found on server'
                }
               
            });
        const userEmail = result.rows[0].email;
        const userId = result.rows[0].id;
        bcrypt
            .compare(password, result.rows[0].password)
            .then(match => {
                if (!match)
                    return res.status(400).json({
                        status: "failed",
                        data: {
                            message: "Invalid Password"
                        }
                    })
                const data = {
                    userEmail,
                    userId,
                };
                jwt.sign({ data }, secretkey, (err, token) => {
                    res.status(200).json({
                        status: 'success',
                        data: {
                            message: 'user logged in sucessfully',
                            token
                        }
                    });
                });
            });
    });
};
