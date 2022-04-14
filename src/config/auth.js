function authenticateAudience(req, res, next) {
    if (req.body.secret !== process.env.AUDIENCE_SECRET)
        return res.status(401).json({ message: 'Unauthorized' });

    next();
}

module.exports = { authenticateAudience };
