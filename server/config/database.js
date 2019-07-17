import {Pool} from "pg";
import dotenv from 'dotenv';
dotenv.config();

// connecting to database
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wayfarer',
    password: process.env.password,
    port: 5432
});


pool.on('connect', () => {
    console.log('connected to the Database');
  });

 
export default pool;

require('make-runnable');

