'use strict';

const sqlite3 = require('sqlite3').verbose();
const validate = require('validate.js');
const Database = require('./lib/Database');
const Logger = require('./lib/Logger');

var dbConnection = null;

function setupFolders() { }


function setupDatabase() {
    let db = new Database('./db/test.db');

    Logger.debug('getting the current database session');
    dbConnection = db.getSession();




}

function setupTables(conn) {
    if (!validate.isObject(conn)) {
        /*let sql = 'IF (EXISTS (SELECT * ' +
                  'FROM INFORMATION_SCHEMA.TABLES' +
                  'WHERE TABLE_SCHEMA = '
        conn.run(sql, function (err) {
            if (err) {
                throw new Error(err.message);
            }
        });*/
        Logger.debug('creating database tables if they don\'t exist');
    }

}

(function () {
    let conn = dbConnection;

    setupFolders();
    setupDatabase();
    setupTables(conn);

    if (conn) {
        
        conn.close();

    }

})();