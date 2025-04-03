import express from "express";
import { ProductManager } from "./ProductManager.js";
import { CartManager } from "./CartManager.js";

const app = express();
const PORT = 8080;

const PRODUCT_URL = "/api/products";
const CART_URL = "/api/carts";
const productManager = new ProductManager("./products.json");
const cartManager = new CartManager("./carts.json");

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get(PRODUCT_URL, async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los productos" });
  }
});

app.get(`${PRODUCT_URL}/:pid`, async (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);

  try {
    const product = await productManager.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

app.post(PRODUCT_URL, async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res
      .status(201)
      .json({ message: "Producto creado correctamente", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

app.put(`${PRODUCT_URL}/:pid`, async (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);

  try {
    const updateProduct = await productManager.updateProduct(id, req.body);
    res.json({ message: "Producto actualizado", product: updateProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

app.delete(`${PRODUCT_URL}/:pid`, async (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);

  try {
    await productManager.deleteProduct(id);
    res.status(201).json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.status(404).json({ error: "Error al eliminar el producto" });
  }
});

app.post(CART_URL, async (req, res) => {
  try {
    await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado correctamente" });
  } catch (error) {
    console.error(error);
  }
});

app.get(`${CART_URL}/:cid`, async (req, res) => {
  const { cid } = req.params;
  const id = parseInt(cid);
  try {
    const cart = await cartManager.getCartById(id);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res
      .status(201)
      .json({ message: "Carrito obtenido correctamente ", cart: cart });
  } catch (error) {
    console.error(error);
  }
});

app.post(`${CART_URL}/:cid/product/:pid`, async (req, res) => {});
