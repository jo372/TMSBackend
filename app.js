'use strict';

const express = require('express');
const app = express();

const validate = require('validate.js');
const Database = require('./lib/Database');
const logger = require('./lib/Logger');
const env = require('./env.js');
const mysqlDatabase = new Database(env.DATABASE_PATH);


// get users tasks by id
app.get('/users/:userid/tasks/:taskid', function(req, res) {
    let userId = req.params.userid;
    let taskId = req.params.taskid;
    if(userId && taskId) {
        res.send(`userId: ${userId}\ntaskId: ${taskId}`);
        //TODO: check that the requesting user is the current logging in user.
        logger.log({
            level: 'info',
            message: `Requested userId: ${userId}, taskId : ${taskId}`
        });
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
});

let listener = app.listen(env.APPLICATION_LISTENING_PORT, function() {
    logger.log({
        level: 'info',
        message: `Listening on port ${listener.address().port}`
    });
});



/*
var dbConnection = null;

function setupFolders() { }


function setupDatabase() {
    let db = new Database('./db/test.db');

    Logger.js.debug('getting the current database session');
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
        Logger.js.debug('creating database tables if they don\'t exist');
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
