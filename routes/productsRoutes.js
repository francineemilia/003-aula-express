const express = require('express');
const routes = express.Router();
let products = require('../products');

routes.get('/',(req,res) => {
    res.status(200).json(products);
});

routes.get('/:id', (req,res) =>{
    const {id} = req.params;
    const product = products.find ((product) => product.id === Number(id));
    res.status(200).json(product);
});

routes.post('/', (req, res) => {
    const content = req.body;
    const newProducts = [...products, content]
    products = newProducts;
    res.status(201).json(newProducts);
})

routes.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const content = req.body;

    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(400).json({ "message": "Product not found" })
    }

    const updatedProducts = products.map((product) => {
        if (product.id === id) {
            return content;
        }
        return product;
    })
    products = updatedProducts;
    res.status(200).json(products);
});

routes.delete('/:id', (req,res) => {
    const id = Number(req.params.id);
    const withoutDeletedProduct = products.filter((product) => product.id !== id);

    products = withoutDeletedProduct;
    res.status(200).json(products);
});

module.exports = routes;