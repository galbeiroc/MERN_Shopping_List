const express = require('express');
const {
  createNewUser,
  authentication,
  getDataUser
} = require('../controllers/users');
const auth = require('../middleware/auth');
const router = express.Router();

//@route POST api/users
//@desc Register new user
//@acces public
router.post('/', createNewUser);

//@route POST api/user/auth
//@desc Authentication
//@acces public
router.post('/auth', authentication);

//@route GET api/user/auth
//@desc Get user data
//@acces public
router.get('/auth', auth, getDataUser);

module.exports = router;
