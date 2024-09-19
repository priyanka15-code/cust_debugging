const express = require('express');
const router = express.Router();
const bwipjs = require('bwip-js');
const Product = require('../models/product.model');
const { initRedisClient } = require('../utils/redis');



// GET all products
router.get('/', async (req, res) => {
    try {
        const Products = await Product.find();
        res.json(Products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// POST create a new Product
router.post('/', async (req, res) => {
    const { pName, pDescription, pPrice, pQuantity } = req.body;

    try {
        const existingProduct = await Product.findOne({ pName });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        let newProduct = new Product({
            pName,
            pDescription,
            pPrice,
            pQuantity
        });
        await newProduct.save();
        const redisClient = await initRedisClient();
        const uniqueProductId = await redisClient.incr('product:id');
        const pId = `P-${uniqueProductId}`;
        newProduct.pId = pId;
        await newProduct.save();
        const barcodeBuffer = await bwipjs.toBuffer({
            bcid: 'code11',
            text: pId,
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: 'center',
        });
        const barcodeImage = `data:image/png;base64,${barcodeBuffer.toString('base64')}`;
        newProduct.barcode = barcodeImage;
        await newProduct.save();
        return res.status(201).json({
            message: 'Product created successfully',
            Product: newProduct,
        });
    } catch (error) {
        console.error('Error creating Product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
/* router.post('/', async (req, res) => {
    const { pName, pDescription, pId, pPrice, pQuantity } = req.body;

    try {
        const existingProduct = await Product.findOne({ pName });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }
        const newProduct = new Product({
            pName,
            pDescription,
            pId,
            pPrice,
            pQuantity
        });
        await newProduct.save();

        return res.status(201).json({ message: 'User created successfully', Product: newProduct });
    } catch (error) {
        console.error('Error creating Product:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}); */
module.exports = router;
