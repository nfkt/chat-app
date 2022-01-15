const Messages = require("../collections/messages");

const messageDao = {
  createMessage,
  updateChat,
  getChatHistory,
  checkMessageExistence
};

function createMessage(message, to, from) {
  const messages = new Messages({
    to: to,
    from: from,
    message: message,
  });
  return messages.save();
}

function checkMessageExistence(to, from) {
  return Messages.count({
    $and: [{ from: from }, { to: to }],
  }).then((count) => {
    if (count != 0) {
      return false;
    }
    return true;
  });
}

function updateChat(message, to, from) {
  return Messages.findOneAndUpdate(
    { $and: [{ from: from }, { to: to }] },
    { $push: { message: message } },
    { new: true }
  );
}

function getChatHistory(to, from) {
  return Messages.findOne({ $and: [{ from: from }, { to: to }] });
}
module.exports = messageDao;
