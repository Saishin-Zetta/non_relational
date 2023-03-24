const router = require('express').Router();
const thought_routes = require('./thoughts');
const user_routes = require('./users');

router.use('/thoughts', thought_routes); 
router.use('/users', user_routes);


module.exports = router;
