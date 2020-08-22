import {
    createPool,
    PoolConfig,
    Pool, PoolConnection, MysqlError, FieldInfo
} from "mysql";
import { Logger } from './Logger';

class Database {
    private readonly pool : Pool;
    /**
     * @param {PoolConfig | string} config the pool configuration which contains details like username and password.
     * @returns {void}
     */
    constructor(config: PoolConfig | string) {
        this.pool = this.createPoolWithConfig(config);
    }
    /**
     * @param {PoolConfig | string} config the pool configuration which contains details like username and password.
     * @returns {Pool} the newly created Pool
     */
    private createPoolWithConfig(config: PoolConfig | string) : Pool {
        const tmpPool : Pool = createPool(config);

        tmpPool.on('acquire', (connection : PoolConnection) => {
            Logger.info('Connection %d acquired', connection.threadId);
        });

        tmpPool.on('connection', (connection) => {
            Logger.info('Created session.');
            connection.query('SET SESSION auto_increment_increment=1');
        });

        tmpPool.on('enqueue', (err: MysqlError | undefined) => {
            Logger.info('Waiting for available connection slot');
            if(err) {
                Logger.error(`error number: ${err.errno}\nerror code: ${err.code}\nerror message: ${err.message}\nfatal: ${err.fatal}\n`);
            }
        });

        tmpPool.on('release', (connection: PoolConnection) => {
            Logger.info('Connection %d released', connection.threadId);
        });

        tmpPool.on('error', (err: MysqlError) => {
            if(err) {
                Logger.error(`error number: ${err.errno}\nerror code: ${err.code}\nerror message: ${err.message}\nfatal: ${err.fatal}\n`);
            }
        });

        return tmpPool;
    }
    /**
     * @param {string} sqlStatement the sql statement you wish to run
     * @param {function} the callback which contains err, result and fields.
     */
    query(sqlStatement : string, callback: (err: MysqlError | null, results: any, fields: FieldInfo[] | undefined) => void) {
        this.pool.getConnection((err: MysqlError, connection : PoolConnection) => {

            if(err) throw err; // error couldn't make a connection.

            connection.query(sqlStatement, (connError : MysqlError | null, results: any, fields: FieldInfo[] | undefined) => {
                // using the users callback returning the fields from the query.
                callback(err, results, fields);
                // releasing it's connection
                connection.release();
                // if there an error after the release, throw it.
                if(connError) throw connError;
            })
        });
    }
}


export { Database };









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
        this.getConnection().then(db => {
            cb(db.prepare(sqlStatement));
            db.release();
        });
    }
}
*/
