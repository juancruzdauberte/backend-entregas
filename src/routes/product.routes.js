import { Router } from "express";
import { ProductManager } from "../utils/ProductManager.js";

const router = Router();
const productManager = new ProductManager("./products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todos los productos" });
  }
});

router.get("/:pid", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res
      .status(201)
      .json({ message: "Producto creado correctamente", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const id = parseInt(pid);

  try {
    const updateProduct = await productManager.updateProduct(id, req.body);
    res.json({ message: "Producto actualizado", product: updateProduct });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

router.delete("/:pid", async (req, res) => {
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

export default router;
