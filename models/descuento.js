var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DescuentoSchema = Schema({
  titulo: { type: String, required: true },
  banner: { type: String, required: false },
  descuento: { type: Number, required: true },
  fecha_inicio: { type: String, required: true },
  fecha_fin: { type: String, required: true },
  categoria: { type: String, required: false },
  createdAt:{type:Date,default: Date.now,required:true}
});

module.exports = mongoose.model("descuento", DescuentoSchema);
 