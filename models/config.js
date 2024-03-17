var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ConfigSchema = Schema({
  categorias: [{ type: Object, required: false }],
  titulo: { type: String, required: false },
  logo: { type: String, required: false },
  serie: { type: Number, required: false },
  correlativo: { type: Number, required: false },
 
});

module.exports = mongoose.model("config", ConfigSchema);
