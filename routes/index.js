const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('apiRoutes', apiRoutes);

router.use((req, res) => {
    return res.send('wrong route');
});

module.exports = router;