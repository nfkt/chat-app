const express = require('express');
const router = express.Router();
const messageServices = require('../services/messages.services');

router.post('/message', messageServices.createMessageService);
router.post('/messages', messageServices.updateChatService);
router.post('/get-message', messageServices.getChatHistoryService);

module.exports = router;