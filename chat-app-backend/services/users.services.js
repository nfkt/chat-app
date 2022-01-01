const userDao = require("../dao/users.dao");

const userServices = {
  createUserService,
  getUserService,
};

function createUserService(req, res) {
    
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);

    userDao.createUser(username, password).then(doc =>{
        console.log(doc);
        res.send(doc);
    })

}

function getUserService(req, res){
    const username = req.body.username;

    userDao.getUser(username).then( doc =>{
        res.send(doc);
    }).catch( err =>{
        res.send(err);
    })

}


module.exports = userServices;
