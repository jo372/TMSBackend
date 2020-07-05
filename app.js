'use strict';

const sqlite3 = require('sqlite3').verbose();
const validate = require('validate.js');
const Database = require('./lib/Database');
const Logger = require('./lib/Logger');

var dbConnection = null;

function setupFolders() { }


function setupDatabase() {
    let db = new Database('./db/test.db');
    Logger.log('creating a database session');
    dbConnection = db.getSession();
    let h = "Hello";
    let w = "World";
    Logger.log('%s ', h, w);


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
        Logger.error("%s", "Oh no :( an unexpected error has occurred.");
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