var express = require('express');
var WishListController = require('../controllers/WishListController.js')
var api = express.Router()
var auth = require('../middlewares/authenticate.js')

api.post('/agregar_wishlist_cliente',auth.auth,WishListController.agregar_wishlist_cliente)
api.get('/obtener_wishlist_cliente/:id',auth.auth,WishListController.obtener_wishlist_cliente)
api.post('/eliminar_wishlist_cliente', auth.auth, WishListController.eliminar_wishlist_cliente)

module.exports = api














