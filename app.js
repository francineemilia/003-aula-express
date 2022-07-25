const express = require('express');
const app = express();
const productsRoutes = require('./routes/productsRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(express.json());

app.use('/api/products', productsRoutes);
app.use('/user', usersRoutes)

app.use((req, res, next) => {
    res.status(404).send('Erro 404, not found');
    next();
});

app.listen(3001, () => {
    console.log('Servidor online')
})