import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../app';

// chai middleware
chai.use(chaiHttp);

const { expect } = chai;

const signupUrl = '/api/user/signup';
const signinUrl = '/api/auth/signin';

const user = {
  first_name: "chichi",
  last_name: "kin",
  email: "chik@test.com",
  password: "12345678",
  confirmPassword: "12345678"
};

describe('USER', () => {
    it(`should register a new user`, (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status');
          done();
        });
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
        .end((err,res) => {
          expect(res.body.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it('it should not register a user with same email twice', (done) => {
      chai.request(app)
        .post(signupUrl)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'application/json')
        .send(user)
        .end((err,res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body).to.have.property('message');
          done();
        });
    });   
});

describe('POST SIGN IN', () => {
  it('login a user with valid email and password', (done) => {
    chai.request(app)
      .post(signinUrl)
      .set('Content-Type', 'application/json')
      .send({
        email: 'chik@test.com',
        password: '12345678',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('status');
        done()
      });
  });

  it('it should not login a user with invalid email', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'anne8778@gmail.com',
        password: '1234567',
      })
      .end((err,res) => {
        expect(res).to.have.status(400);
        expect(res.body.data).to.be.an('object');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('it should not login a user with invalid  password', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: 'chik@test.com',
        password: '123456',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('message');
        done();
      });
  });

  it('it should not login a user with empty fields', (done) => {
    chai.request(app)
      .post(signinUrl)
      .send({
        email: '',
        password: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('error');
        expect(res.body.data).to.have.property('message');
        done();
      });
  })  

});

