var express = require('express');
var ConfigController = require('../controllers/ConfigController.js')
var api = express.Router()
var auth = require('../middlewares/authenticate.js')
var multiparty = require('connect-multiparty')
var path = multiparty({uploadDir:'./uploads/configuraciones'})

 
api.put('/actualizar_config_admin/:id',[auth.auth,path],ConfigController.actualizar_config_admin)
api.get('/obtener_logo/:img?',ConfigController.obtener_logo) 
api.get('/obtener_config_admin',auth.auth,ConfigController.obtener_config_admin)
api.get('/obtener_config_publico',ConfigController.obtener_config_publico)
module.exports = api

