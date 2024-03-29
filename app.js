const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const { connectDB } = require("./config/db");
const cliente_route = require("./routes/cliente.js");
const admin_route = require("./routes/admin.js");
const producto_route = require("./routes/producto.js");
const cupon_route = require("./routes/cupon.js");
const config_route = require("./routes/config.js");
const carrito_route = require("./routes/carrito.js");
const venta_route = require("./routes/venta.js");
const descuento_route = require("./routes/descuento.js");
const wishlist_route = require("./routes/wishlist.js");

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

var server = require("http").createServer(app);
var io = require("socket.io")(server, {
  cors: { origin : "*" },
});

io.on('connection', function(socket){
  socket.on('delete-carrito',function(data){
    io.emit('new-carrito',data)

  })

  socket.on('add-carrito',function(data){
    io.emit('new-carrito-add',data)

  })


})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb", extended: true }));

app.use("/api", cliente_route);
app.use("/api", admin_route);
app.use("/api", producto_route);
app.use("/api", cupon_route);
app.use("/api", config_route);
app.use("/api", carrito_route);
app.use("/api", venta_route);
app.use("/api", descuento_route);
app.use("/api", wishlist_route);
