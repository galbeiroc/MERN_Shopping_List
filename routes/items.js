const express = require('express');
const {
  getAllItems,
  createNewItem,
  deleteItem
} = require('../controllers/items');
const auth = require('../middleware/auth');
const router = express.Router();

//@route GET api/items
//@desc GET all items
//@acces public
router.get('/', getAllItems);

//@route POST api/items
//@desc POST all items
//@acces private
router.post('/', auth, createNewItem);

//@route DELETE api/items/:id
//@desc DELETE all items
//@acces private
router.delete('/:id', auth, deleteItem);

module.exports = router;
