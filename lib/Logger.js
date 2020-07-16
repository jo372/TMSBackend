const util = require('util');
const validate = require('validate.js');

let jsonObjHasValue = function(jsonObj, LFValue) {
    return Object.keys(jsonObj).filter((key) => jsonObj[key] === LFValue).length > 0 ? true : false;
}

const LoggerLevel = {
    'NOTSET': 0,
    'DEBUG': 1,
    'INFO': 2,
    'WARNING': 3,
    'ERROR': 4,
    'CRITICAL': 5
};

class Logger {
    constructor() {
        this.level = LoggerLevel.NOTSET;
    }
    setLevel(level) {
        if(jsonObjHasValue(LoggerLevel, level)) {
            this.level = level;
            console.log(this.level);
        }
    }
    getLevel() { return this.level; }
    debug(fmt, ...args) {
        if(this.getLevel() == LoggerLevel.DEBUG) this.log('[debug]: ' + fmt, args);
    }
    error(fmt, ...args) {
        if(this.getLevel() == LoggerLevel.ERROR) this.log('[error]: ' + fmt, args);
    }
    log(fmt, ...args) {
        // fixing the error of just printing [array] instead of the string value.
        if(validate.isArray(args)) {
            let tmpString = "";
            for(let i=0; i < args.length; i++) {
                tmpString += args[i];
            }
            args = tmpString;
        }
        console.log(util.format(fmt, args));
    }
}

module.exports = {
    Logger,
    LoggerLevel
}