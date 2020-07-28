'use strict';

const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const validate = require('validate.js');
const Database = require('./lib/Database');
const winston = require('winston');
const env = require('./env.js');

function getTodaysDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${dd}-${mm}-${yyyy}`;
}

// setting up my logger for all modules.
winston.loggers.add(env.DEFAULT_LOGGER_NAME, {
    level: 'debug',
    transports : [
        new winston.transports.Console(),
        new winston.transports.File({filename:  `logs/${getTodaysDate()}-combined.log`})
    ]
});

// getting the current logger.
const logger = winston.loggers.get(env.DEFAULT_LOGGER_NAME);


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
    const query = req.query;
    // if there is a query, check if it's a filter.
    if(query) {
        const parentTaskId = query.parentid;
        res.send({
            'test': 1,
            'test2': 2
        })
    } else {
        // return defaults.
    }
})


let listener = app.listen(env.APPLICATION_LISTENING_PORT, function() {
    console.log(`Listening on port ${listener.address().port}`);
});



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
