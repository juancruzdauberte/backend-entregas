import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRoutes from "./routes/product.routes.js";
import cartsRoutes from "./routes/cart.routes.js";
import http from "http";
import { Server } from "socket.io";
import { ProductManager } from "./utils/ProductManager.js";

const app = express();
const server = http.createServer(app);
const socketServer = new Server(server);
const PORT = 8080;

const productManager = new ProductManager("./src/products.json");

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

socketServer.on("connection", async (socket) => {
  console.log("Cliente conectado", socket.id);

  const products = await productManager.getProducts();
  socket.emit("updateProducts", products);

  socket.on("addProduct", async (data) => {
    await productManager.addProduct(data);
    const updated = await productManager.getProducts();
    socketServer.emit("updateProducts", updated);
  });

  socket.on("deleteProduct", async (code) => {
    await productManager.deleteProduct(code);
    const updated = await productManager.getProducts();
    socketServer.emit("updateProducts", updated);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.get("/api/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products });
});

app.get("/", async (req, res) => {
  res.render("formulario");
});
