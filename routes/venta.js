var express = require('express');
var VentaController = require('../controllers/VentaController.js')
var api = express.Router()
var auth = require('../middlewares/authenticate.js')

api.post('/registro_compra_cliente',auth.auth,VentaController.registro_compra_cliente)
api.get('/enviar_correo_compra_cliente/:id',auth.auth,VentaController.enviar_correo_compra_cliente)

module.exports = api














