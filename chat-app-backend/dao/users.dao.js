const Users = require('../collections/users');

const userDao = {
    createUser,
    checkUserName,
    getUser,
    getAllUsers
}

function createUser(username, password){
    const user = new Users({
        name:username,
        password: password
    });
    return user.save();
}

function checkUserName(username) {
    return Users.count({
        name: username
    }).then((count)=>{
        if(count != 0){
            return false;
        }
        return true
        
    })
}

function getUser(username){

    //Return of user to check
    return Users.findOne({name: username})
}

function getAllUsers(){

    //Return of user to check
    return Users.find();
}


module.exports = userDao;