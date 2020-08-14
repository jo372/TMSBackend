const winston = require('winston');
const env = require('../env.js');

function getTodaysDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${dd}-${mm}-${yyyy}`;
}

const log = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({
            filename:  `./logs/${getTodaysDate()}-combined.log`
        })
    ]
});

if(process.env.NODE_ENV !== 'production') {
    log.level = 'debug';
}

module.exports = log;