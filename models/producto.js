var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
  titulo: { type: String, required: true },
  slug: { type: String, required: false },
  galeria: [{ type: Object, required: false }],
  portada: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  contenido: { type: String, required: true },
  stock: { type: Number, required: true },
  nventas: { type: Number, default: 0, required: false },
  npuntos: { type: Number, default: 0, required: false },
  variedades: [{ type: Object, required: false }],
  titulo_variedad: { type: String, required: false },
  categoria: { type: String, required: true },
  estado: { type: String,default:'Edicion', required: false },
  isInWishlist: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: false },
});

module.exports = mongoose.model("producto", ProductoSchema);
