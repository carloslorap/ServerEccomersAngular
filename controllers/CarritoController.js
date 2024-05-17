var Carrito = require("../models/carrito.js");
const Wishlist = require("../models/wishlist");
var Producto = require("../models/producto.js");

const agregar_carrito_cliente = async function (req, res) {
  //if (req.user) {
    let data = req.body;

    try {
      let carrito_cliente = await Carrito.find({ cliente: data.cliente, producto: data.producto });

      if (carrito_cliente.length == 0) {
        let reg = await Carrito.create(data);

        // Obtener el producto para verificar el id
        let producto = await Producto.findById(data.producto);

        if (producto && producto._id) {
          // Eliminar el producto de la lista de deseos
          await Wishlist.deleteOne({ cliente: data.cliente, producto: data.producto });

         
        }

        res.status(200).send({ data: reg });
      } else if (carrito_cliente.length >= 1) {
        res.status(200).send({ data: undefined });
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      res.status(500).send({ message: 'Error interno del servidor' });
    }
  // }
  //  else {
  //   res.status(500).send({ message: 'NoAccess' });
  // }
};


const obtener_carrito_cliente = async function (req, res) {
  if (req.user) {
    let id = req.params["id"];

    let carrito_cliente = await Carrito.find({ cliente: id }).populate(
      "producto"
    );
    res.status(200).send({ data: carrito_cliente });
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const eliminar_carrito_cliente = async function (req, res) {
  if (req.user) {
    let id = req.params["id"];

    let reg = await Carrito.findByIdAndDelete({ _id: id });
    res.status(200).send({ data: reg });
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

module.exports = {
  agregar_carrito_cliente,
  obtener_carrito_cliente,
  eliminar_carrito_cliente,
};
