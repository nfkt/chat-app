const Users = require('../collections/users');

const userDao = {
    createUser,
    getUser
}

function createUser(username, password){
    const user = new Users({
        name:username,
        password: password
    });
    return user.save();
}

function getUser(username){

    //Return of user to check
    return Users.findOne({name: username})
}

module.exports = userDao;