import chai from 'chai';
import chaiHttp from "chai-http";
import { Pool } from 'pg';
import dotenv from 'dotenv'
import app from '../app';

// chai middleware
chai.use(chaiHttp);
dotenv.config();

const { expect } = chai;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'wayfarer',
    password: process.env.TEST,
    port: 5432
});
const booking = '/api/booking';

describe('BOOKING', () => {
    it('Admin only ', done => {
        chai
            .request(app)
            .post(booking)
            .send({
                trip_id:"1",
                user_id: "3",
                created_on: "7/15/2018"
            })
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            });
    });

});



