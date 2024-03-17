var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContactoSchema = Schema({
  cliente: { type: String, required: false },
  mensaje: { type: String, required: false },
  asunto: { type: String, required: false },
  estado: { type: String, required: false },
  telefono: { type: String, required: false },
  correo: { type: String, required: false },
  createdAt:{type:Date,default: Date.now,required:true}
 
});

module.exports = mongoose.model("contacto", ContactoSchema);
