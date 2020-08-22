import express from "express";
import {Logger} from "./Logger";
import {Database} from './Database';
import {Env} from './env';

const app = express();
const port : number = 8080;

app.get('/users/:userid/tasks/:taskid', (req : any, res : any) => {
    const userId : number = parseInt(req.params.userid, 10);
    const taskId : number = parseInt(req.params.taskid, 10);

    if(userId && taskId) {
        res.send(`userId: ${userId}\ntaskId:${taskId}`);
        Logger.info(`Requested UserId:${userId} & TaskId: ${taskId}`);
    }
});

app.get('/login', (req: any, res: any) => {
    Logger.info('Logging in user');
});

app.get('/logout', (req: any, res: any) => {
    Logger.info('Logging out user');
});

// get all of users tasks
app.get('/users/:userid/tasks', (req: any, res : any)  => {
    const query : any = req.query;
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

Logger.info(process.env.NODE_PORT);

app.listen(Env.APPLICATION_LISTENING_PORT, () => {
   Logger.info(`Listening on port ${Env.APPLICATION_LISTENING_PORT}`);
});
