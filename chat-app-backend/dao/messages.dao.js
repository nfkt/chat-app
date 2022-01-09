const Messages = require("../collections/messages");

const messageDao = {
  createMessage,
};

function createMessage(message, to, from) {
  const message = new Messages({
    to: to,
    from: from,
    message: message,
  });
  return message.save();
}

module.exports = messageDao;
