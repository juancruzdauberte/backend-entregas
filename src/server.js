import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import productsRoutes from "./routes/product.routes.js";
import cartsRoutes from "./routes/cart.routes.js";
import { connectDb } from "./config/db.js";
import config from "./config/config.js";
import viewRoutes from "./public/js/views.router.js";
import { addProductToCart } from "./controller/cart.controller.js";

connectDb();
const app = express();

app.engine(
  "handlebars",
  handlebars.engine({
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));

app.listen(config.PORT, () => {
  console.log(
    `Servidor corriendo en el puerto http://localhost:${config.PORT}`
  );
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/", viewRoutes);
