const sqlite3 = require('sqlite3');
const validate = require('validate.js');
const winston = require('winston');
const logger = winston.loggers.get(env.DEFAULT_LOGGER_NAME);

class Database {
    /**
     * @param {string} databasePath the path to the database file.
     * */
    constructor(databasePath) {
        if(!validate.isString(databasePath)) {
            throw new TypeError('please pass a valid variable type.');
        }

        try {
            this.session = new sqlite3.Database(databasePath, (err) => {
                if (err) {
                    throw new Error(err);
                }
                return this;
            });
        } catch (e) {
            logger.log(e.stack);
        }
    }
    hasSession() {
        return this.session !== null;
    }
    getSession() {
        if(this.hasSession()) {
            return this.session;
        }
    }
    /**
     * @param {string} sqlStatement the sql statement to execute.
     * @throws Error if an .run exception occurs.
     * */
    runQuery(sqlStatement) {
        if(!validate.isString(sqlStatement)){
            sqlStatement = sqlStatement.toString();
        }

        this.getSession().run(sqlStatement, function (err) {
            if (err) {
                throw new Error(err);
            }
            logger.log(err.stack);
        });
    }
}

Object.freeze(Database);

module.exports = Database;
