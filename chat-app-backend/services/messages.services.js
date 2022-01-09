const messageDao = require("../dao/messages.dao");

const messageService = {
  createMessageService,
};

function createMessageService(req, res) {
  messageDao
    .createMessage(req.body.message, req.body.to, req.body.from)
    .then((doc) => {
      res.send(doc);
    });
}

module.exports = messageService;
