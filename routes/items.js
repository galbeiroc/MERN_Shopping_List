const express = require('express');
const {
  getAllItems,
  createNewItem,
  deleteItem
} = require('../controllers/items');
const router = express.Router();

//Item Model
const Item = require('../models/Items');

//@route GET api/items
//@desc GET all items
//@acces public
router.get('/', getAllItems);

//@route POST api/items
//@desc POST all items
//@acces public
router.post('/', createNewItem);

//@route DELETE api/items/:id
//@desc DELETE all items
//@acces public
router.delete('/:id', deleteItem);

module.exports = router;
