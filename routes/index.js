const router = require('express').Router();
const api_routes = require('./api');

router.use('/api', api_routes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
