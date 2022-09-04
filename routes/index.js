const expressRouter = require('express').Router();
const apiRoutes = require('./apiRoutes');

expressRouter.use('apiRoutes', apiRoutes);

expressRouter.use((req, res) => {
    return res.send('wrong route');
});

module.exports = expressRouter;