import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import client from "../config/database";
import dotenv from 'dotenv';
dotenv.config();
const secretkey = process.env.secretkey;

// Register a user
exports.postUser = (req, res, next) => {
    let { first_name, last_name, email, password, confirmPassword, adminCode, is_admin } = req.body;
    if (!first_name || !last_name || !email || !password || !confirmPassword)
        return res.status(400).json({ status: 400, error: "Bad request", message: "All fields are required" });
    if (password.length < 6) return res.json({ msg: "Pasword is too short" });
    if (password !== confirmPassword) return res.json({ msg: "Password does not match" });
    client.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
        if (result.rows >= '1') return res.status(400).json({ status: 400, error: "Conflict", message: 'User already exists' });
        let hashedPassword;
        try {
            const salt = bcrypt.genSaltSync(10);
            hashedPassword = bcrypt.hashSync(password, salt);
            password = hashedPassword
        } catch (error) {
            throw error;
        }
        const users = [
            first_name,
            last_name,
            email,
            password = hashedPassword
        ]
        client.query("INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *", users, (error, result) => {
            if (error) return res.status(400).json({ status: 400, error: error });
            const userId = result.rows[0].id;
            const data = { email, userId };
            jwt.sign({ data }, secretkey, (err, token) => {
                res.status(200).json({
                    token,
                    status: 200,
                    data: result.rows[0]
                });

            });
            if (adminCode === process.env.admin) {
                client.query("SELECT * FROM users WHERE email = $1", [email], (error, result) => {
                    const userEmail = result.rows[0].email;
                    client.query("UPDATE users SET is_admin = true WHERE email = $1", [userEmail])
                });
            };
        });
    })
};
