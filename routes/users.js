const express = require('express');
const {
  createNewUser,
  authentication,
  getDataUser
} = require('../controllers/users');
const auth = require('../middleware/auth');
const router = express.Router();

//@route POST api/users/register
//@desc Register new user
//@acces public
router.post('/register', createNewUser);

//@route POST api/user/login
//@desc Authentication
//@acces public
router.post('/login', authentication);

//@route GET api/users/auth
//@desc Get user data
//@acces public
router.get('/user', auth, getDataUser);

module.exports = router;
