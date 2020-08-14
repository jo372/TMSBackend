class env {
    static DEFAULT_LOGGER_NAME = 'tms-logger';
    static APPLICATION_LISTENING_PORT = 8888;
    static DATABASE_PATH = 'db/test.db';
    static PROMISE_TIMEOUT = 1000;
}

Object.freeze(env);

module.exports = env;