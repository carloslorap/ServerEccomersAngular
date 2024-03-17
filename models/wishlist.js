var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WishListSchema = Schema({

  producto: { type: Schema.ObjectId, ref: "producto", required: true },
  cliente: { type: Schema.ObjectId, ref: "cliente", required: true },
  createdAt:{type:Date,default: Date.now,required:true}
});

module.exports = mongoose.model("wishlist", WishListSchema);
