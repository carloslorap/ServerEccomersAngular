var express = require('express');
var DescuentoController = require('../controllers/DescuentoController.js')
var auth = require('../middlewares/authenticate.js')
var multiparty = require('connect-multiparty')
var path = multiparty({uploadDir:'./uploads/descuentos'})
var api = express.Router()


 
api.post('/registro_descuento_admin',[auth.auth,path],DescuentoController.registro_descuento_admin) 
api.get('/listar_descuentos_admin/:filtro?',auth.auth,DescuentoController.listar_descuentos_admin) 
api.get('/obtener_banner_descuento/:img?',DescuentoController.obtener_banner_descuento) 
api.get('/obtener_descuento_admin/:id',auth.auth,DescuentoController.obtener_descuento_admin) 
api.put('/actualizar_descuento_admin/:id',[auth.auth,path],DescuentoController.actualizar_descuento_admin) 
api.delete('/eliminar_descuento_admin/:id',auth.auth,DescuentoController.eliminar_descuento_admin) 

api.get('/obtener_descuento_activo',DescuentoController.obtener_descuento_activo) 
module.exports = api

  