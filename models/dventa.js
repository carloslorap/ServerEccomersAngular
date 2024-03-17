var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DVentaSchema = Schema({
  producto: { type: Schema.ObjectId, ref: "producto", required: true },
  cliente: { type: Schema.ObjectId, ref: "cliente", required: true },
  venta: { type: Schema.ObjectId, ref: "venta", required: true },
  subtotal: { type: Number, required: false },
  variedad: { type: String, required: false },
  cantidad: { type: Number, required: false },
  createdAt:{type:Date,default: Date.now,required:true}
});

module.exports = mongoose.model("dventa", DVentaSchema);
