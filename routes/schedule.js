const express = require('express');
const router = express.Router();

const scheduleController = require('../controllers/schedules');
const validation = require('../middleware/validate');

router.get('/', scheduleController.getAll);

router.get('/:id', scheduleController.getSingle);

router.post('/', validation.saveSchedule, scheduleController.createSchedule);

router.put('/:id', validation.saveSchedule, scheduleController.updateSchedule);

router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
