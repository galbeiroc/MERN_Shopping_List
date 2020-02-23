const express = require('express');
const { createNewUser } = require('../controllers/users');
const router = express.Router();

//@route POST api/users
//@desc Register new user
//@acces public
router.post('/', createNewUser);

module.exports = router;
