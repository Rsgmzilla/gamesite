const assert = require('chai').assert;
let sinon = require('sinon');

const DB = require('../app/db');
const Config = require('../app/config');

describe("Manage DB", () => {
    describe('Open DB', () => {
        it('Open connection without errors', () => {
            DB.connect(Config.DB_SCHEME + Config.DB_LOGIN + ':' + Config.DB_PASSWORD + Config.DB_URL, Config.DB_NAME, (err) => {
                assert.isNull(err, 'there was no error');
            });
        });
    });

    describe('Close DB', function(){
        it('Close all connections', function(){
            DB.close( () => {
                assert.isNull(DB.get().db);

                assert.isNull(DB.get().client);
            });
        });
    });
});