var Descuento = require("../models/descuento.js");
var fs = require("fs");
var path = require("path");



const registro_descuento_admin = async function (req, res) {
    if (req.user) {
      if (req.user.rol === "admin") {
        let data = req.body;
        try {
          var img_path = req.files.banner.path;
          var str_path = img_path.split("\\");
          var banner_name = str_path[2];
  
          data.banner = banner_name;
          let reg = await Descuento.create(data);
  
          res.status(200).send({ data: reg});
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
 
  const listar_descuentos_admin = async function (req, res) {
    if (req.user) {
      var filtro = req.params["filtro"];
      let reg = await Descuento.find({ titulo: new RegExp(filtro, "i") });
      res.status(200).send({ data: reg });
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  };

  const obtener_banner_descuento = async function (req, res) {
    var img = req.params["img"];
    fs.stat("./uploads/descuentos/" + img, function (err) {
      if (!err) {
        let path_img = "./uploads/descuentos/" + img;
        res.status(200).sendFile(path.resolve(path_img));
      } else {
        let path_img = "./uploads/default.jpg";
        res.status(200).sendFile(path.resolve(path_img));
      }
    });
  };


  const obtener_descuento_admin = async function (req, res) {
    if (req.user) {
      var id = req.params["id"];
      try {
        var reg = await Descuento.findById({ _id: id });
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
      }
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  };
  
  const actualizar_descuento_admin = async function (req, res) {
    if (req.user) {
      if (req.user.rol === "admin") {
        let id = req.params["id"];
        let data = req.body;
  
        if (req.files) {
          //si es que hay imagen
          var img_path = req.files.banner.path;
          var str_path = img_path.split("\\");
          var name = str_path[2];
  
          let reg = await Descuento.findByIdAndUpdate(
            { _id: id },
            {
              titulo: data.titulo,
              descuento: data.descuento,
              fecha_inicio:data.fecha_inicio,
              fecha_fin:data.fecha_fin,
              categoria:data.categoria,
              banner: name,
            }
          );
  
          fs.stat("./uploads/descuentos/" + reg.banner, function (err) {
            if (!err) {
              fs.unlink("./uploads/descuentos/" + reg.banner, (err) => {
                if (err) throw err;
              });
            }
          });
  
          res.status(200).send({ data: reg });
          console.log("si hay imagen");
        } else {
          //si es que no hay imagen
          let reg = await Descuento.findByIdAndUpdate(
            { _id: id },
            {
                titulo: data.titulo,
                descuento: data.descuento,
                fecha_inicio:data.fecha_inicio,
                fecha_fin:data.fecha_fin,
                categoria:data.categoria
            }
          );
          res.status(200).send({ data: reg });
          console.log("no hay imagen");
        }
      } else {
        res.status(403).send({ message: "NoAccess" });
      }
    } else {
      res.status(403).send({ message: "NoAccess" });
    }
  };

  const eliminar_descuento_admin = async function (req, res) {
    if (req.user) {
      if (req.user.rol == "admin") {
        var id = req.params["id"];
  
        var reg = await Descuento.deleteOne({ _id: id });
        res.status(200).send({ data: reg });
      } else {
        res.status(500).send({ message: "NoAccess" });
      }
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  };

  const obtener_descuento_activo = async function (req, res) {
      let descuento = await Descuento.find().sort({createdAt:-1})
      var arr_descuento = []
      var today = Date.parse(new Date().toString())/1000

      descuento.forEach(element=>{
        var tt_inicio = Date.parse(element.fecha_inicio+ "T00:00:00")/1000
        var tt_fin = Date.parse(element.fecha_fin + "T23:59:59")/1000

        if (today >= tt_inicio && today <= tt_fin) {
            arr_descuento.push(element)
        }

      })

      if (arr_descuento.length >= 1) {
        res.status(200).send({data:arr_descuento})
      }else{
        res.status(200).send({data:undefined})
      }
  };

module.exports = {
    registro_descuento_admin,
    listar_descuentos_admin, 
    obtener_banner_descuento,
    obtener_descuento_admin,
    actualizar_descuento_admin,
    eliminar_descuento_admin,
    obtener_descuento_activo,
};
