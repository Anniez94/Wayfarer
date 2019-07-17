import chai from 'chai';
import chaiHttp from "chai-http";
import app from "../app";

// chai middleware
chai.use(chaiHttp);

const { expect } = chai;

describe('App', () => {
    it('app should take users to the landing page', (done) => {
        chai
            .request(app)
            .get('/')
            .then(res => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                done();
            }).catch(err => done(err));

    });
});

describe('Page Not Found', () => {
    it('app should return 404 for route not found', (done) => {
        chai
            .request(app)
            .get('/wrong_page.html')
            .then(res => {
                expect(res.status).to.be.equal(404);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('error');
                done();
              })
              .catch(err => done(err));
    });
});