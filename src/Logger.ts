import * as winston from 'winston';


function minTwoDigits(digit : number) {
    return ('0' + digit).slice(-2);
}

function getTodaysDate() : string {
    const today : Date = new Date();
    const dd : number = today.getDate();
    const mm : number = today.getMonth() + 1;
    const yyyy : number = today.getFullYear();

    return `${minTwoDigits(dd)}-${minTwoDigits(mm)}-${yyyy}`;
}

export const Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        }),
        new winston.transports.File({
            filename: `./logs/${getTodaysDate()}-combined.log`
        })
    ]
});

/*
function minTwoDigits(digit : number) {
    return ('0' + digit).slice(-2);
}

function getTodaysDate() : string {
    let today : Date = new Date();
    let dd : number = today.getDate();
    let mm : number = today.getMonth() + 1;
    let yyyy : number = today.getFullYear();

    return `${minTwoDigits(dd)}-${minTwoDigits(mm)}-${yyyy}`;
}

const logger = winston.createLogger({
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
    logger.level = 'debug';
}

module.exports = logger;*/