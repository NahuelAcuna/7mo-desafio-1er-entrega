const express = require('express')
const Contenedor = require('../container/container')
const {Router} = express
const cartRouter = Router()

//Container
const itemCart = 'carrito.json'
const containerCart = new Contenedor(itemCart)


cartRouter.get('/', (req, res) => {
    res.json(containerCart.getAll())
})
cartRouter.post('/', (req, res) => {
    obj = {...req.body, ...{products: []}}
    res.json(containerCart.save(obj))
})
cartRouter.post('/:id/products', (req, res) => {
    const product = req.body
    const cartID = req.params.id
    const cart = containerCart.getById(cartID)
    cart.products.push(product)

    const newObj = containerCart.editByBody(cart, cartID)

    res.json(newObj)
})

module.exports = cartRouter