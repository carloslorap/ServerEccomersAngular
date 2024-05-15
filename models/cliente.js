var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
  nombres: { type: String, required: false },
  apellidos: { type: String, required: false },
  pais: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  perfil: { type: String, default: "perfil.png", required: false },
  telefono: { type: String, required: false },
  genero: { type: String, required: false },
  f_nacimiento: { type: String, required: false },
  dni: { type: String, required: false },

  createdAt:{type:Date,default: Date.now,required:true}
});

module.exports = mongoose.model("cliente", ClienteSchema);
