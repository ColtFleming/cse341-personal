const express = require('express');
const router = express.Router();
const authorizationRoutes = require('./authorization');

router.use('/', require('./swagger'));
router.use('/rosters', require('./rosters'));
router.use('/schedules', require('./schedule'));
router.use('/authorization', authorizationRoutes);

module.exports = router;
