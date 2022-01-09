const userDao = require("../dao/users.dao");

const userServices = {
  createUserService,
  getUserService,
  getAllUsers,
};

function createUserService(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  userDao.checkUserName(username).then((isUnique) => {
    if (isUnique) {
      userDao.createUser(username, password).then((doc) => {
        res.send(doc);
      });
    } else {
      res.send("user already exist");
    }
  });
}

function getUserService(req, res) {
  const username = req.body.username;

  userDao
    .getUser(username)
    .then((doc) => {
      if (doc) res.send(doc);
      else res.send("No such user");
    })
    .catch((err) => {
      res.send(err);
    });
}

function getAllUsers(req, res) {
  userDao
    .getAllUsers()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.esnd(err);
    });
}

module.exports = userServices;
