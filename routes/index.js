const express = require('express');
const router = express.Router();
const authorizationRoutes = require('./authorization');
//const loadUser = require('../middleware/loadUser');

//router.use([loadUser]);
router.use('/', require('./swagger'));
router.use('/rosters', require('./rosters'));
router.use('/schedules', require('./schedule'));
router.use('/authorization', authorizationRoutes);

module.exports = router;
