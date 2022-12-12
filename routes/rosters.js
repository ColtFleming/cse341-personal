const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/rosters');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.get('/name/:name', contactsController.getName);

router.get('/number/:number', contactsController.getNumber);

router.post('/', validation.saveRosterMember, contactsController.createContact);

router.put('/:id', validation.saveRosterMember, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
