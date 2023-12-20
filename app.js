const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cluster = require('cluster');

const config = require('./configs/config');
const usersRoute = require('./routes/usersRoute');
const errorHandler = require('./utils/errorHandler');
const notFoundHandler = require('./utils/notFoundHandler');

const app = express();

/* Protects against we vulnerabilities */
app.use(helmet());

/* Parse application/json */
app.use(bodyParser.json());

/* Parse application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

/* Routes Setup */
app.use('/api/users', usersRoute);

/* 404 Not Found Middleware */
app.use(notFoundHandler);

/* Error Handler Middleware */
app.use(errorHandler);

/* Server Start */
app.listen(+config.PORT + cluster.worker.id, () => {
    console.log(`Server is running on port ${+config.PORT + cluster.worker.id}, worker ${cluster.worker.id}`);
});