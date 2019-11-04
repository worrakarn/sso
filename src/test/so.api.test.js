// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../config/www';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Students", () => {
    describe("GET /", () => {
        // Test to get all students record
        xit("should get all students record", (done) => {
           done();
        });
    });
});

