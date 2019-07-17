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

const signupUrl = '/api/user/signup';
const signinUrl = '/api/auth/signin';

describe('USER', () => {
    before(function(done){
      this.timeout(10000)
      const users = pool.query(`TRUNCATE users CASCADE`);
      done()
  });

    it(`it should register a user`, (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Content-Type', 'application/json')
        .send({
          email: 'chiedu@gmail.com',
          first_name: 'Chiedu',
          last_name: 'Mokwunye',
          password: '123456',
        })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          done();
        }).catch(err => done(err));
    });

    it('it should not register a user with empty fields', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send({
          email: 'chiedu@gmail.info',
          first_name: '',
          last_name: '',
          password: '123456',
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('message');
          done();
        }).catch(err => done(err));
    });

    it('it should not register a user with same email twice', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Content-Type', 'application/json')
        .send({
          email: 'chiedu@gmail.com', // email already exist
          first_name: 'Chiedu',
          last_name: 'Mokwunye',
          password: '123456',
        })
        .then(res => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('message');
          done();
        }).catch(err => done(err));
    });   
});

describe('POST SIGN IN', () => {
  it('login a user with valid email and password', (done) => {
    chai.request(app)
      .post(signinUrl)
      .set('Content-Type', 'application/json')
      .send({
        email: 'anne@gmail.com',
        password: '1234567',
      })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
        done()
      }).catch(err => done(err));
  });

  it('it should not login a user with invalid email and password', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'anne8778@gmail.com',
        password: '1234567',
      })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.an('array');
        expect(res.body).to.have.property('data');
        done()
      }).catch(err => done(err));
  });

  it('it should not login a user with empty fields', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: '',
        password: '',
      })
      .then(res => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.property('msg');
        done();
      }).catch(err => done(err));
  })  

});