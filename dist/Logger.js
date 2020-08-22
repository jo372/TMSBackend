"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston = __importStar(require("winston"));
function minTwoDigits(digit) {
    return ('0' + digit).slice(-2);
}
function getTodaysDate() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    return `${minTwoDigits(dd)}-${minTwoDigits(mm)}-${yyyy}`;
}
exports.Logger = winston.createLogger({
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
