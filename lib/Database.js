const { Pool } = require('better-sqlite-pool');
const validate = require('validate.js');
const logger = require('./Logger');
const env = require('../env.js');
const fs = require('fs');

class Database {
    constructor(databasePath) {
        if(!databasePath) throw new Error('please provide a valid database path.');
        if(!validate.isString(databasePath)) throw new TypeError(`please provide a valid variable type. ${typeof databasePath} provided but expected String`);

        this.pool = null;

        fs.access(databasePath, fs.F_OK, (err) => {
            // TODO: throw new error instead of winston logging.
            if(err) {
                logger.error(err);
               // throw new Error(err);
               // return;
            };
        });

        // now that we've validated the existence of the file, create new pool.
        this.pool = new Pool(databasePath);
    }
    hasPool() { return this.getPool() !== null; }
    getPool() { return this.pool; }
    getConnection() { return this.hasPool() ? this.getPool().acquire() : this.getPool(); }
    runSQL(sqlStatement, cb) {
        if(!sqlStatement) throw new Error('please provide a sqlStatement');
        if(!validate.isString(sqlStatement)) throw new TypeError(`please provide a valid variable type. ${typeof sqlStatement} provided but expected String`);

        // if a callback was passed.
        if(cb) {
            if(!validate.isFunction(cb)) throw new TypeError(`please provide a valid variable type. ${typeof cb} provided but expected Function`);
        }

        if(this.hasPool()) {
            this.getConnection().then(db => {
                let response = db.prepare(sqlStatement);
                cb(response);
                db.release();
            });
        }
    }
}

Object.freeze(Database);

module.exports = Database;


/*
class Database {
    /!**
     * @param {string} databasePath the path to the database file.
     * *!/
    constructor(databasePath) {
        this.session = null;

        if(!databasePath) {
            throw Error('please pass a database path.');
        }
        if(!validate.isString(databasePath)) {
            throw TypeError('please pass a valid variable type.');
        }

        try {

            /!*this.session = new Promise((resolve, reject) => {
                let tmpDatabase = new sqlite3.Database(databasePath, (err) => {
                    if(err) reject(err);
                    else resolve(tmpDatabase);
                });
            }).catch((err) => { throw new Error(err); } );*!/


            //new sqlite3.Database(databasePath);

            //if(tmpSession !== null) this.session = tmpSession;
        } catch (e) {
            logger.log({
                level: 'error',
                message: e.message
            });
        }
    }
    hasSession() {
        return this.getSession() !== null;
    }
    getSession() {
        return this.session;
    }
    /!**
     * @param {string} sqlStatement the sql statement to execute.
     * @throws Error if an .run exception occurs.
     * *!/
    runQuery(sqlStatement) {
        if(!validate.isString(sqlStatement)){
            sqlStatement = sqlStatement.toString();
        }

        this.getSession().run(sqlStatement, function (err) {
            if (err) {
                throw new Error(err);
            }
            logger.log({
              level: 'error',
              message: `${err.stack}`
            });
        });
    }
    close() {
        if(this.hasSession()) {
            this.session.close();
        }
    }
}

Object.freeze(Database);

module.exports = Database;*/
