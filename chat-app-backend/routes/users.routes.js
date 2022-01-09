const express = require('express');
const router = express.Router();
const userServices = require('../services/users.services');


router.post('/register', userServices.createUserService);
router.post('/login', userServices.getUserService);
router.get('/all', userServices.getAllUsers);
router.post('/add-friend', userServices.addFriendService);

module.exports = router;