var Producto = require("../models/producto.js");
var Inventario = require("../models/inventario.js");
var fs = require("fs");
var path = require("path");

const registro_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol === "admin") {
      let data = req.body;
      try {
        var img_path = req.files.portada.path;
        var str_path = img_path.split("\\");
        var name = str_path[2];

        data.slug = data.titulo
          .trim()
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
        data.portada = name;
        let reg = await Producto.create(data);

        let inventario = await Inventario.create({
          admin: req.user.sub,
          cantidad: data.stock,
          proveedor: "Primer Registro",
          producto: reg._id,
        });

        res.status(200).send({ data: reg, inventario: inventario });
      } catch (error) {
        console.log(error);
        res.status(403).send({
          data: undefined,
          message: "Ocurrio un problema al registrar el producto",
        });
      }
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};

const listar_productos_admin = async function (req, res) {
  if (req.user) {
    var filtro = req.params["filtro"];
    let reg = await Producto.find({ titulo: new RegExp(filtro, "i") });
    res.status(200).send({ data: reg });
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};

const obtener_portada = async function (req, res) {
  var img = req.params["img"];
  fs.stat("./uploads/productos/" + img, function (err) {
    if (!err) {
      let path_img = "./uploads/productos/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const obtener_producto_admin = async function (req, res) {
  if (req.user) {
    var id = req.params["id"];
    try {
      var reg = await Producto.findById({ _id: id });
      res.status(200).send({ data: reg });
    } catch (error) {
      res.status(200).send({ data: undefined });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const actualizar_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol === "admin") {
      let id = req.params["id"];
      let data = req.body;

      if (req.files) {
        //si es que hay imagen
        var img_path = req.files.portada.path;
        var str_path = img_path.split("\\");
        var name = str_path[2];

        let reg = await Producto.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            stock: data.stock,
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido,
            portada: name,
          }
        );

        fs.stat("./uploads/productos/" + reg.portada, function (err) {
          if (!err) {
            fs.unlink("./uploads/productos/" + reg.portada, (err) => {
              if (err) throw err;
            });
          }
        });

        res.status(200).send({ data: reg });
      } else {
        //si es que no hay imagen
        let reg = await Producto.findByIdAndUpdate(
          { _id: id },
          {
            titulo: data.titulo,
            stock: data.stock,
            precio: data.precio,
            categoria: data.categoria,
            descripcion: data.descripcion,
            contenido: data.contenido,
          }
        );
        res.status(200).send({ data: reg });
      }
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};

const eliminar_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      var id = req.params["id"];

      var reg = await Producto.deleteOne({ _id: id });
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const actualizar_producto_variedades_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol === "admin") {
      let id = req.params["id"];
      let data = req.body;

      let reg = await Producto.findByIdAndUpdate({ _id: id },{
        titulo_variedad:data.titulo_variedad,
        variedades:data.variedades
      });
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};

const agregar_imagen_galeria_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol === "admin") {
      let id = req.params["id"];
      let data = req.body;

      var img_path = req.files.imagen.path;
      var name = img_path.split("\\");
      var imagen_name = name[2];

      let reg = await Producto.findByIdAndUpdate({_id:id},{$push: {galeria:{
        imagen:imagen_name,
        _id:data._id
      }}})

      res.status(200).send({data:reg})
     
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};

const eliminar_imagen_galeria_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol === "admin") {
      let id = req.params["id"];
      let data = req.body;

      let reg = await Producto.findByIdAndUpdate({_id:id},{$pull: {galeria:{
        _id:data._id
      }}})

      res.status(200).send({data:reg})
     
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};

const listar_productos_publico = async function (req, res) {
 
    var filtro = req.params["filtro"];
    let reg = await Producto.find({ titulo: new RegExp(filtro, "i") });
    res.status(200).send({ data: reg });

};

const obtener_producto_slug_publico = async function (req, res) {
 
  var slug = req.params["slug"]; 
  let reg = await Producto.findOne({ slug: slug });
  res.status(200).send({ data: reg });

};

const listar_productos_recomendados_publico = async function (req, res) {
 
  var categoria = req.params["categoria"];
  let reg = await Producto.find({ categoria: categoria }).sort({createdAt:-1}).limit(10);
  res.status(200).send({ data: reg });

};

const listar_productos_nuevos_publico = async function (req, res) {
 
  let reg = await Producto.find().sort({createdAt: -1}).limit(8);
  res.status(200).send({ data: reg });

};

const listar_productos_mas_vendido_publico = async function (req, res) {
 
  let reg = await Producto.find().sort({nventas: -1}).limit(8);
  res.status(200).send({ data: reg });

};


//inventario(start)
const listar_inventario_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      var id = req.params["id"];
      var reg = await Inventario.find({ producto: id })
        .populate("admin")
        .sort({ createdAt: -1 });
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const eliminar_inventario_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      try {
        var id = req.params["id"];

        // Verifica si el id es válido antes de continuar
        if (!id || typeof id !== "string") {
          return res
            .status(400)
            .send({ message: "ID de inventario no válido" });
        }

        let reg = await Inventario.findById(id);

        // Verifica si se encontró un registro de inventario
        if (!reg) {
          return res
            .status(404)
            .send({ message: "No se encontró el inventario para eliminar" });
        }

        // Verifica si la propiedad 'producto' está presente en el documento de inventario
        if (!reg.producto) {
          return res
            .status(400)
            .send({
              message: "El inventario no tiene una referencia de producto",
            });
        }

        // Realiza otras operaciones después de la eliminación
        let prod = await Producto.findById(reg.producto);

        // Verifica si se encontró el producto asociado
        if (!prod) {
          return res
            .status(404)
            .send({ message: "No se encontró el producto asociado" });
        }

        let nuevo_stock = prod.stock - reg.cantidad;

        let producto = await Producto.findByIdAndUpdate(
          reg.producto,
          { stock: nuevo_stock },
          { new: true } // Devuelve el documento actualizado
        );

        // Elimina el registro de inventario
        await Inventario.findByIdAndDelete(id);

        res.status(200).send({ data: producto });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          data: undefined,
          message: "Ocurrió un problema",
        });
      }
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};

const registro_inventario_producto_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      try {
        let data = req.body;

        let reg = await Inventario.create(data);

        let prod = await Producto.findById({ _id: reg.producto });

        let nuevo_stock = prod.stock + reg.cantidad;

        let producto = await Producto.findByIdAndUpdate(
          { _id: reg.producto },
          {
            stock: nuevo_stock,
          }
        );

        res.status(200).send({ data: producto });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          data: undefined,
          message: "Ocurrió un problema",
        });
      }
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  } else {
    res.status(403).send({ message: "NoAccess" });
  }
};
//inventario(end)



module.exports = {
  registro_producto_admin,
  listar_productos_admin,
  obtener_portada,
  obtener_producto_admin,
  actualizar_producto_admin,
  eliminar_producto_admin,
  listar_inventario_admin,
  eliminar_inventario_producto_admin,
  registro_inventario_producto_admin,
  actualizar_producto_variedades_admin,
  agregar_imagen_galeria_admin,
  eliminar_imagen_galeria_admin,
  listar_productos_publico,
  obtener_producto_slug_publico,
  listar_productos_recomendados_publico,
  listar_productos_nuevos_publico,
  listar_productos_mas_vendido_publico,
};
