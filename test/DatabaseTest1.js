const chai = require('chai');
const assert = require('assert');
const should = chai.should();
const expect = chai.expect;
const Database = require('../lib/Database');

const WORKING_DB_DIR = './db/test.db';

/*
describe('constructor', function() {
    it('should throw a TypeError, if a string is not passed.', function(){
        expect(function() {
            new Database(25);
        }).to.throw(TypeError);
    });
    it('should throw Error, if not parameter is passed', function(){
        expect(function() {
            new Database();
        }).to.throw(Error);
    });
    // TODO: throw new error instead of winston logging.
    /*
    it('should throw Error, if an incorrect database path is passed.', async function() {
        let constructor = new Database('../db/non-existent-db.db');
        expect(constructor).to
    });
});

describe('hasPool', function() {
    it('should return true if there is a pool.', function() {
        let tmpDatabase = new Database(WORKING_DB_DIR);
        expect(tmpDatabase.hasPool()).to.be.true;
    });
});
describe('runSQL', function() {
    let tmpDatabase = new Database(WORKING_DB_DIR);
    it('should throw an error if nothing is passed.', function(){
       expect(function(){
           tmpDatabase.runSQL()
       }).to.throw(Error);
    });
    it('should throw a type error if an invalid type is passed', function() {
       expect(function() {
           tmpDatabase.runSQL(1234);
       }).to.throw(TypeError);
    });
    it('should return a response, if a valid sql statement was used.', function() {
        tmpDatabase.runSQL('SELECT * FROM `test`;', (response) => {
            expect(response.all()).to.not.be.null;
        });
    });
    it('should throw type error if function not passed to callback', function() {
        expect(function() {
            tmpDatabase.runSQL('SELECT * FROM `test`;', 124);
        }).to.throw(TypeError);
    });
});
*/
