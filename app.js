const express = require('express');
let products = require('./products');
const app = express();
app.use(express.json())

app.get('/products',(req,res) => {
    res.status('200').json(products);
});

app.get('/products/:id', (req,res) =>{
    const {id} = req.params;
    const product = products.find ((product) => product.id === Number(id));
    res.status('200').json(product);
});

app.post('/products', (req, res) => {
    const content = req.body;
    const newProducts = [...products, content]
    console.log(content)
    products = newProducts;
    res.status(201).json(newProducts);
})

app.put('/products/:id', (req, res) => {
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

app.delete('/products/:id', (req,res) => {
    const id = Number(req.params.id);
    const withoutDeletedProduct = products.filter((product) => product.id !== id);

    products = withoutDeletedProduct;
    res.status(200).json(products);
});

app.listen(3001, () => {
    console.log('Servidor online')
})