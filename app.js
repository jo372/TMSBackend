'use strict';

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const validate = require('validate.js');
const Database = require('./lib/Database');
//const Logger = require('./lib/Logger');

/*
var dbConnection = null;

function setupFolders() { }


function setupDatabase() {
    let db = new Database('./db/test.db');

    Logger.debug('getting the current database session');
    dbConnection = db.getSession();




}

function setupTables(conn) {
    if (!validate.isObject(conn)) {
        let sql = 'IF (EXISTS (SELECT * ' +
                  'FROM INFORMATION_SCHEMA.TABLES' +
                  'WHERE TABLE_SCHEMA = '
        conn.run(sql, function (err) {
            if (err) {
                throw new Error(err.message);
            }
        });
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

})();*/

const serverPort = 8888;

// get users tasks by id
app.get('/users/:userid/tasks/:taskid', function(req, res) {
    let userId = req.params.userid;
    let taskId = req.params.taskid;
    if(userId && taskId) {
        res.send(`userId: ${userId}\ntaskId: ${taskId}`);
        //TODO: check that the requesting user is the current logging in user.
    }
});

// get all of users tasks
app.get('/users/:userid/tasks', function(req, res) {
    let query = req.query;
    // if there is a query, check if it's a filter.
    if(query) {
        let parentTaskId = query.parentid;
        console.log(query);
    } else {
        // return defaults.
    }
})


let listener = app.listen(serverPort, function() {
    console.log(`Listening on port ${listener.address().port}`);
});
