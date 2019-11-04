import appRoot from 'app-root-path';
import winston from 'winston';
const { combine, timestamp, json } = winston.format;

const options = {
    fileErr: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: false,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    unCaughtErr: {
        level: 'error',
        filename: `${appRoot}/logs/uncaught.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.fileErr)
    ],
    exceptionHandlers: [
        new winston.transports.File(options.unCaughtErr)
    ],

    exitOnError: true, // do exit on handled exceptions
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        json(),
    ),
});

if ((process.env.NODE_ENV || '').trim() !== 'production') {
    logger.add(new winston.transports.Console(options.console));
}

export default logger;