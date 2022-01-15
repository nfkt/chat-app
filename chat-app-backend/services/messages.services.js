const messageDao = require("../dao/messages.dao");

const messageService = {
  createMessageService,
  updateChatService,
  getChatHistoryService,
  messageHandler
};

function createMessageService(req, res) {
  messageDao
    .createMessage(req.body.message, req.body.to, req.body.from)
    .then((doc) => {
      res.send(doc);
    });
}

function updateChatService(req, res) {
  messageDao
    .updateChat(req.body.message, req.body.to, req.body.from)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send(err);
    });
}

function messageHandler(req, res){
  messageDao.checkMessageExistence(req.body.to, req.body.from).then((isUnique)=>{
    if(isUnique){
      messageDao
      .createMessage(req.body.message, req.body.to, req.body.from)
      .then((doc) => {
        res.send(doc);
      });
    }
    else{
      messageDao
    .updateChat(req.body.message, req.body.to, req.body.from)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send(err);
    });
    }
  })
}

function getChatHistoryService(req, res) {
  messageDao
    .getChatHistory(req.body.to, req.body.from)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send(err);
    });
}


module.exports = messageService;
