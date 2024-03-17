var express = require('express');
var ProductoController = require('../controllers/ProductoController.js')
var auth = require('../middlewares/authenticate.js')
var multiparty = require('connect-multiparty')
var path = multiparty({uploadDir:'./uploads/productos'})
var api = express.Router()

 
api.post('/registro_producto_admin',[auth.auth,path],ProductoController.registro_producto_admin) 
api.get('/listar_productos_admin/:filtro?',auth.auth,ProductoController.listar_productos_admin) 
api.get('/obtener_portada/:img?',ProductoController.obtener_portada) 
api.get('/obtener_producto_admin/:id',auth.auth,ProductoController.obtener_producto_admin) 
api.put('/actualizar_producto_admin/:id',[auth.auth,path],ProductoController.actualizar_producto_admin) 
api.delete('/eliminar_producto_admin/:id',auth.auth,ProductoController.eliminar_producto_admin) 
api.put('/actualizar_producto_variedades_admin/:id',auth.auth,ProductoController.actualizar_producto_variedades_admin) 
api.put('/agregar_imagen_galeria_admin/:id',[auth.auth,path],ProductoController.agregar_imagen_galeria_admin)
api.put('/eliminar_imagen_galeria_admin/:id',auth.auth,ProductoController.eliminar_imagen_galeria_admin) 
api.get('/listar_productos_publico/:filtro?',ProductoController.listar_productos_publico) 
api.get('/obtener_producto_slug_publico/:slug?',ProductoController.obtener_producto_slug_publico) 
api.get('/listar_productos_recomendados_publico/:categoria?',ProductoController.listar_productos_recomendados_publico) 
api.get('/listar_productos_nuevos_publico',ProductoController.listar_productos_nuevos_publico) 
api.get('/listar_productos_mas_vendido_publico',ProductoController.listar_productos_mas_vendido_publico) 

//INVENTARIO
api.get('/listar_inventario_admin/:id',auth.auth,ProductoController.listar_inventario_admin) 
api.delete('/eliminar_inventario_producto_admin/:id',auth.auth,ProductoController.eliminar_inventario_producto_admin) 
api.post('/registro_inventario_producto_admin',auth.auth,ProductoController.registro_inventario_producto_admin) 

module.exports = api

