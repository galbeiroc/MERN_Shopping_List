//User Model
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
  createNewUser: (req, res) => {
    const { name, email, password } = req.body;

    //validations
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'please enter all fields' });
    }

    User.findOne({ email }).then(user => {
      if (user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        name,
        email,
        password
      });

      //create salt hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser.save().then(user => {
            jwt.sign(
              {
                id: user.id
              },
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;

                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                });
              }
            );
          });
        });
      });
    });
  },

  authentication: (req, res) => {
    const { email, password } = req.body;

    //validations
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email }).then(user => {
      if (!user) return res.status(400).json({ msg: 'User does not exists' });

      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch)
          return res.status(400).json({ msg: 'Invalid credentials' });

        jwt.sign(
          {
            id: user.id
          },
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            });
          }
        );
      });
    });
  },

  getDataUser: (req, res) => {
    User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
  }
};
