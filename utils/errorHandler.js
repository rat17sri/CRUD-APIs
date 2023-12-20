const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const error = err.message ? err.message : 'Internal Server Error';
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({ error });
}

module.exports = errorHandler;