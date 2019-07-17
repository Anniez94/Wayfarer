import chai from 'chai';
import chaiHttp from "chai-http";
import app from '../app';

// chai middleware
chai.use(chaiHttp);

const { expect } = chai;
const bus = '/api/bus';

describe('BUS', () => {
    it('Admin only ', done => {
        chai
            .request(app)
            .post(bus)
            .send({
                number_plate: "BEN XYZ",
                manufacturer: "Toyota",
                model: "benz",
                year: "2018",
                capacity: "5"
            })
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                done();
            }).catch(err => done(err))
    });

});



