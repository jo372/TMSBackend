"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logger_1 = require("./Logger");
const env_1 = require("./env");
const app = express_1.default();
const port = 8080;
app.get('/users/:userid/tasks/:taskid', (req, res) => {
    const userId = parseInt(req.params.userid, 10);
    const taskId = parseInt(req.params.taskid, 10);
    if (userId && taskId) {
        res.send(`userId: ${userId}\ntaskId:${taskId}`);
        Logger_1.Logger.info(`Requested UserId:${userId} & TaskId: ${taskId}`);
    }
});
app.get('/login', (req, res) => {
    Logger_1.Logger.info('Logging in user');
});
app.get('/logout', (req, res) => {
    Logger_1.Logger.info('Logging out user');
});
// get all of users tasks
app.get('/users/:userid/tasks', (req, res) => {
    const query = req.query;
    // if there is a query, check if it's a filter.
    if (query) {
        const parentTaskId = query.parentid;
        res.send({
            'test': 1,
            'test2': 2
        });
    }
    else {
        // return defaults.
    }
});
Logger_1.Logger.info(process.env.NODE_PORT);
app.listen(env_1.Env.APPLICATION_LISTENING_PORT, () => {
    Logger_1.Logger.info(`Listening on port ${env_1.Env.APPLICATION_LISTENING_PORT}`);
});
