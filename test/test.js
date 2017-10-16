const assert = require('assert'),
    request = require('request');

describe('test simple chat api', () => {
    const url = 'http://localhost:3000/api/posts';
    const form = {
        message: 'test post api use mocha',
        username: 'mocha'
    };

    it('get api/posts return status 200', () => {
        request(url, (error, res, body) => {
            expect(res.statusCode).to.equal(200);
        });
    });

    it('post api/posts return status 200', () => {
        request.post({url, form}, (error, res, body) => {
            expect(res.statusCode).to.equal(200);
        });
    });

});