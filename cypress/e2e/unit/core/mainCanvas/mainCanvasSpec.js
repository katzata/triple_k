const expect = require('chai').expect;
const request = require('request');

describe("Main canvas", () => {
    it("Main canvaaaaaaaaas", function(done) {
        request('http://localhost:8080' , function(error, response, body) {
            expect(body).to.equal('Hello World');
            done();
        });
    });
});