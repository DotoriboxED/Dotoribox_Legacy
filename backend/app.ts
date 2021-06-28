import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './router/index';
import helmet from 'helmet';
import cors from 'cors';

import apiRouter from './router/api';
const app = express();

app.set('views', path.join(process.cwd(), 'views'));

app.set('view engine', 'pug');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
})

app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    
    res.status(err.status || 500);
    res.json(err);
});

export default app;