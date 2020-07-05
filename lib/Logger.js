const util = require('util');
const validate = require('validate.js');

class Logger {
    constructor() {

    }
    error(fmt, ...args) {
        this.log('[error]: ' + fmt, args);
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

module.exports = new Logger();