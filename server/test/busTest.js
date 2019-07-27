import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../app';

// chai middleware
chai.use(chaiHttp);

const { expect } = chai;
const bus = '/api/bus';
const signupUrl = '/api/user/signup';
let adminToken;

const admin = {
    first_name: "Chichi",
    last_name: "Ken",
    email: "annies94@test.com",
    password: "12345678",
    confirmPassword: "12345678",
    adminCode: "admin",
    is_admin: true   
};

const buses = {
    number_plate: "ben12345678",
    manufacturer: "Toyota",
    model: "benz",
    year: "2018",
    capacity: 15
}


describe('BUS', () => {
    before(done => {
        chai
            .request(app)
            .post(signupUrl)
            .send(admin)
            .end((err, res) => {
                const { token } = res.body;
                adminToken = token;
                done();
            });
    });
    it('Admin only can register a bus ', done => {
        chai
            .request(app)
            .post(bus)
            .set('Authorization', adminToken)
            .send(buses)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.data).to.be.an('object');
                done();
            });
    });

});



