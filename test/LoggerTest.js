const Logger = require('../lib/Logger');
const chai = require('chai');
const assert = require('assert');
const should = chai.should();

let tmpLogger = new Logger.Logger();

describe('Logger', function()  {
    describe('#jsonObjHasValue', function(){
        let jsonObj = {
            'test': 1,
            'test2': 2
        }
        it('should return true, if a json object has the value.', function(){
            
       });
    });
    describe('#setLevel', function() {
       it('should set the level of the logger. If the LoggerLevel is found', function() {
           tmpLogger.setLevel(Logger.LoggerLevel.DEBUG);
           tmpLogger.getLevel().should.equal(Logger.LoggerLevel.DEBUG);
       });
       it('should do nothing if the level doesn\'t exist', function() {
           let loggerLevel = 666;
           tmpLogger.setLevel(loggerLevel);
           tmpLogger.getLevel().should.not.equal(loggerLevel);
       })
    });
});