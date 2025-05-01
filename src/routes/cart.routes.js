import { Router } from "express";
import { CartManager } from "../utils/CartManager.js";

const router = Router();
const cartManager = new CartManager("./carts.json");

router.post("/", async (req, res) => {
  try {
    await cartManager.createCart();
    res.status(201).json({ message: "Carrito creado correctamente" });
  } catch (error) {
    console.error(error);
  }
});

router.get("/:cid", async (req, res) => {
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

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const cartId = parseInt(cid);
  const productId = parseInt(pid);

  try {
    const cart = await cartManager.addProductToCart(
      cartId,
      productId,
      quantity
    );
    res
      .status(201)
      .json({ message: "Producto agregado al carrito exitosamente", cart });
  } catch (error) {
    console.log(error);
  }
});

export default router;
