const express = require('express');
const router = express.Router();
const messageServices = require('../services/messages.services');

router.post('/message', messageServices.createMessageService);

module.exports = router;