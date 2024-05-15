const Wishlist = require("../models/wishlist");
const Carrito = require("../models/carrito.js");
var Producto = require("../models/producto.js");
var Cliente = require("../models/cliente.js");

const agregar_wishlist_cliente = async function (req, res) {
  if (req.user) {
    let data = req.body;

    try {
      let wishlist_cliente = await Wishlist.findOne({
        cliente: data.cliente,
        producto: data.producto,
      }); 

      if (!wishlist_cliente) {
        // El producto no está en la lista de deseos del cliente, se agrega
        let reg = await Wishlist.create(data);

        // Eliminar el producto del carrito del cliente si existe
        await Carrito.findOneAndDelete({
          cliente: data.cliente,
          producto: data.producto,
        });

        res.status(200).send({ data: reg });
      } else {
        // El producto ya está en la lista de deseos del cliente
        res.status(200).send({ data: undefined });
      }
    } catch (error) {
      console.error("Error al agregar producto a la lista de deseos:", error);
      res.status(500).send({ message: "Error interno del servidor" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};


const obtener_wishlist_cliente = async function (req, res) {
  if (req.user) {
    let id = req.params["id"];

    let wishlist_cliente = await Wishlist.find({ cliente: id }).populate(
      "producto"
    );
    res.status(200).send({ data: wishlist_cliente });
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const eliminar_wishlist_cliente = async function (req, res) {
  if (req.user) {
    let data = req.body;

    // Busca el producto en la lista de deseos del cliente
    let wishlist_cliente = await Wishlist.findOneAndDelete({
      cliente: data.cliente,
      producto: data.producto,
    });

    if (wishlist_cliente) {

      res.status(200).send({ data: wishlist_cliente });
    } else {
      res
        .status(404)
        .send({ message: "Producto no encontrado en la lista de deseos" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

module.exports = {
  agregar_wishlist_cliente,
  eliminar_wishlist_cliente,
  obtener_wishlist_cliente,
};
