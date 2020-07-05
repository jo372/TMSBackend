const sqlite3 = require('sqlite3');
const validate = require('validate.js');

class Database {
    constructor(databasePath) {
        this.activeSession = null;
        this.dbDirectory = databasePath;
    }

    getSession() {
        if(!this.activeSession) {
            this.activeSession = new sqlite3.Database(this.dbDirectory, (err) => {
                if (err) {
                    console.error(err.message);
                    return null;
                }
                return this;
            });
        }
        return this.activeSession;
    }

    runQuery(sqlQuery) {
        if(!validate.isString(sqlQuery)) {
            throw new TypeError('Please provide a valid parameter type.');
        }

        this.activeSession.run(sqlQuery, function (err) {
            if (err) {
                throw new Error(err.message);
            }
            Logger.log('')
        });
    }
}

module.exports = Database;
