import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../app';

// chai middleware
chai.use(chaiHttp);

const futute_date = new Date(Date.now() + 86900)
const { expect } = chai;
const trip = '/api/trip';

describe('Trip', () => {
    // it('it should not create a trip with empty fields', done => {
    //     chai.request(app)
    //         .post(trip)
    //         .send({
    //             bus_id: '1',
    //             origin: 'Lekki',
    //             trip_date: futute_date.toISOString(),
    //             fare: "",
    //             status: ""
    //         })
    //         .then(res => {
    //             expect(res).to.have.status(400);
    //             expect(res.body).to.be.a('object');
    //             expect(res.body).to.have.property('error');
    //             done();
    //         }).catch(err => done(err));
    // });

    it('Admin only ', done => {
        chai
            .request(app)
            .post(trip)
            .send({
                bus_id: '1',
                origin: 'Lekki',
                destination: 'Ikeja',
                trip_date: futute_date.toISOString(),
                fare: 750,
                status: "active"
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            }).catch(err => done(err))
    });

});



describe('GET ALL TRIP AS AN ADMIN AND USER', () => {
    it('it should get all trips', (done) => {
        chai.request(app)
            .get(trip)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            }).catch(err => done(err));
    });
});

describe('ONLY ADMIN CAN DELETE A TRIP', () => {
    it('it should get all trips', (done) => {
        chai.request(app)
            .get(trip)
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                done();
            }).catch(err => done(err));
    });
});


