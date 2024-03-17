var Config = require("../models/config.js");
var fs = require("fs");
var path = require("path");

const obtener_config_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      let reg = await Config.findById({ _id: "65da7b77c80482a92bfdbe4d" });
      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const obtener_logo = async function (req, res) {
  var img = req.params["img"];
  fs.stat("./uploads/configuraciones/" + img, function (err) {
    if (!err) {
      let path_img = "./uploads/configuraciones/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg";
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const actualizar_config_admin = async function (req, res) {
  if (req.user) {
    if (req.user.rol == "admin") {
      let data = req.body;

      if (req.files) {
        //si es que hay imagen
        console.log("si hay img");
        var img_path = req.files.logo.path;
        var str_path = img_path.split("\\");
        var name = str_path[2];

        let reg = await Config.findByIdAndUpdate(
          { _id: "65da7b77c80482a92bfdbe4d" },
          {
            categorias: data.categorias,
            titulo: data.titulo,
            serie: data.serie,
            correlativo: JSON.parse(data.correlativo),
            logo: name,
          }
        );

        fs.stat("./uploads/configuraciones/" + reg.logo, function (err) {
          if (!err) {
            fs.unlink("./uploads/configuraciones/" + reg.logo, (err) => {
              if (err) throw err;
            });
          }
        });

        res.status(200).send({ data: reg });
      } else {
        console.log("no hay img");
        let reg = await Config.findByIdAndUpdate(
          { _id: "65da7b77c80482a92bfdbe4d" },
          {
            categorias: data.categorias,
            titulo: data.titulo,
            serie: data.serie,
            correlativo: data.correlativo,
          }
        );
        res.status(200).send({ data: reg });
      }
    } else {
      res.status(500).send({ message: "NoAccess" });
    }
  } else {
    res.status(500).send({ message: "NoAccess" });
  }
};

const obtener_config_publico = async function (req, res) {
  let reg = await Config.findById({ _id: "65da7b77c80482a92bfdbe4d" });
  res.status(200).send({ data: reg });
};

module.exports = {
  actualizar_config_admin,
  obtener_config_admin,
  obtener_logo,
  obtener_config_publico,
};
