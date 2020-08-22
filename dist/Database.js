"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mysql_1 = require("mysql");
const Logger_1 = require("./Logger");
class Database {
    /**
     * @param {PoolConfig | string} config the pool configuration which contains details like username and password.
     * @returns {void}
     */
    constructor(config) {
        this.pool = this.createPoolWithConfig(config);
    }
    /**
     * @param {PoolConfig | string} config the pool configuration which contains details like username and password.
     * @returns {Pool} the newly created Pool
     */
    createPoolWithConfig(config) {
        const tmpPool = mysql_1.createPool(config);
        tmpPool.on('acquire', (connection) => {
            Logger_1.Logger.info('Connection %d acquired', connection.threadId);
        });
        tmpPool.on('connection', (connection) => {
            Logger_1.Logger.info('Created session.');
            connection.query('SET SESSION auto_increment_increment=1');
        });
        tmpPool.on('enqueue', (err) => {
            Logger_1.Logger.info('Waiting for available connection slot');
            if (err) {
                Logger_1.Logger.error(`error number: ${err.errno}\nerror code: ${err.code}\nerror message: ${err.message}\nfatal: ${err.fatal}\n`);
            }
        });
        tmpPool.on('release', (connection) => {
            Logger_1.Logger.info('Connection %d released', connection.threadId);
        });
        tmpPool.on('error', (err) => {
            if (err) {
                Logger_1.Logger.error(`error number: ${err.errno}\nerror code: ${err.code}\nerror message: ${err.message}\nfatal: ${err.fatal}\n`);
            }
        });
        return tmpPool;
    }
    /**
     * @param {string} sqlStatement the sql statement you wish to run
     * @param {function} the callback which contains err, result and fields.
     */
    query(sqlStatement, callback) {
        this.pool.getConnection((err, connection) => {
            if (err)
                throw err; // error couldn't make a connection.
            connection.query(sqlStatement, (connError, results, fields) => {
                // using the users callback returning the fields from the query.
                callback(err, results, fields);
                // releasing it's connection
                connection.release();
                // if there an error after the release, throw it.
                if (connError)
                    throw connError;
            });
        });
    }
}
exports.Database = Database;
/*
import * as BetterSqlite3 from 'better-sqlite3';
import {
    Pool,
    PoolConnection
} from "better-sqlite-pool";
import { Logger } from './Logger';
import * as fs from 'fs';

class Database {
    private readonly pool : Pool;
    constructor(databaseFilePath: string) {
        fs.access(databaseFilePath, fs.constants.F_OK, (err) => {
           if(err) {
               Logger.error(err);
           }
        });
        this.pool = new Pool(databaseFilePath);
    }
    hasPool() : boolean { return this.getPool() !== null; }
    getPool() : Pool { return this.pool; }
    getConnection() : Promise<PoolConnection> { return this.getPool().acquire(); }
    runSQL(sqlStatement: string, cb: (statement: BetterSqlite3.Statement<any[]>) => void) : void {
        this.getConnection().then(db1 => {
            cb(db1.prepare(sqlStatement));
            db1.release();
        });
    }
}
*/
