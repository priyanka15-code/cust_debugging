const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pName: {
    type: String,
    required: true
  },
  pDescription: {
    type: String,
    required: true,
  },
  pId: {
    type: String,
    
  },
  pPrice: {
    type: String,
    required: true
  },
  pQuantity: {
    type: String, 
    required:true
  },
  barcode: { 
    type: String 
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
