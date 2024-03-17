var express = require('express');
var ClienteController = require('../controllers/ClienteController.js')
var api = express.Router()
var auth = require('../middlewares/authenticate.js')

 
api.post('/registro_cliente',ClienteController.registro_cliente)
api.post('/login_cliente',ClienteController.login_cliente)

api.get('/listar_clientes_filtro_admin/:tipo/:filtro?',auth.auth,ClienteController.listar_clientes_filtro_admin)
api.post('/registro_cliente_admin',auth.auth,ClienteController.registro_cliente_admin)
api.get('/obtener_cliente_admin/:id',auth.auth,ClienteController.obtener_cliente_admin)
api.put('/actualizar_cliente_admin/:id',auth.auth,ClienteController.actualizar_cliente_admin)
api.delete('/eliminar_cliente_admin/:id',auth.auth,ClienteController.eliminar_cliente_admin)
api.get('/obtener_cliente_guest/:id',auth.auth,ClienteController.obtener_cliente_guest)
api.put('/actualizar_perfil_cliente_guest/:id',auth.auth,ClienteController.actualizar_perfil_cliente_guest)
api.get('/obtener_ordenes_cliente/:id',auth.auth,ClienteController.obtener_ordenes_cliente)
api.get('/obtener_detalles_ordenes_cliente/:id',auth.auth,ClienteController.obtener_detalles_ordenes_cliente)

//DIRECCIONES**********
api.post('/registro_direccion_cliente',auth.auth,ClienteController.registro_direccion_cliente)
api.get('/listar_direcciones_cliente/:id',auth.auth,ClienteController.listar_direcciones_cliente)
api.put('/cambiar_direccion_cliente/:id/:cliente',auth.auth,ClienteController.cambiar_direccion_cliente)
api.get('/obtener_direccion_principal_cliente/:id',auth.auth,ClienteController.obtener_direccion_principal_cliente)

//CONTACTO***********
api.post('/enviar_mensaje_contacto',ClienteController.enviar_mensaje_contacto)

module.exports = api



