import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../app';


// chai middleware
chai.use(chaiHttp);

const { expect } = chai;
const booking = '/api/booking';
const signupUrl = '/api/user/signup';
const bus = '/api/bus';
const trip = '/api/trip';

let userToken;
let adminToken;

const bookings = {
    trip_id: 1,
    user_id: 2,
    booking_date: "2019-07-27"
}

const trips = {
    bus_id: 1,
    origin: 'Lagos',
    destination: 'Benin',
    trip_date: '2019-07-27',
    fare: 2500.00,
    status: "active"
};

const buses = {
    number_plate: 'ben1234',
    manufacturer: 'Toyota',
    model: 'Camry',
    year: '2017',
    capacity: 15
};

const user = {
    first_name: "Chichi",
    last_name: "Ken",
    email: "annie@test.com",
    password: "12345678",
    confirmPassword: "12345678"    
};

const admin = {
    first_name: "Chichi",
    last_name: "Ken",
    email: "annies@test.com",
    password: "12345678",
    confirmPassword: "12345678",
    adminCode: "admin",
    is_admin: true   
};
  

describe(' POST BOOKING', () => {       
        before(done => {
            chai
                .request(app)
                .post(signupUrl)
                .send(user)
                .end((err, res) => {
                    const { token } = res.body;
                    userToken = token;
                    done();
                });
        });

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

        before(done => {
            chai
                .request(app)
                .post(bus)
                .set('Authorization', adminToken)
                .send(buses)
                .end((err, res) => {
                    done();
                });
        });

        before(done => {
            chai
                .request(app)
                .post(trip)
                .set('Authorization', adminToken)
                .send(trips)
                .end((err, res) => {
                    done();
                });
        });

        it('Should create a new booking object.', done => {
            chai
                .request(app)
                .post(booking)
                .set('Authorization', userToken)
                .send(bookings)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data).to.have.property('message');
                    expect(res.body.data).to.have.property('id');
                    expect(res.body.data).to.have.property('user_id');
                    expect(res.body.data).to.have.property('trip_id');
                    expect(res.body.data).to.have.property('created_on');
                    done();
                });
        });

});

