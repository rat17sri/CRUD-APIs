const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: 'This route does not exist' });
}

module.exports = notFoundHandler;