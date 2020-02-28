//Item Model
const Item = require('../models/Items');

module.exports = {
  getAllItems: (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items));
  },

  createNewItem: (req, res) => {
    const { name } = req.body;
    console.log('name', req.body);
    

    const newItem = new Item({ name });

    newItem.save().then(item => res.json(item));
  },

  deleteItem: (req, res) => {
    const { id } = req.params;
    console.log('id item', id);
    
    Item.findById(id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  }
};
