import { formatDateTime } from '../util/date';
import type { RequestHandler } from 'express';

const logger: RequestHandler = (req, res, next) => {
    console.log(
        `${formatDateTime('YYYY-MM-DD hh:mm A')} ${req.protocol}://${req.get(
            'host'
        )}${req.originalUrl}`
    );
    next();
};

export default logger;
