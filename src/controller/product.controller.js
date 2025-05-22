import productService from "../services/product.service.js";

export async function getAll(req, res) {
  try {
    const products = await productService.getAll();
    if (products.length > 0) return res.status(200).json(products);
    res.status(404).json({ message: "No hay productos" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function getByCode(req, res) {
  const { code } = req.params;
  try {
    const product = await productService.getByCode(code);
    if (!product) {
      return res
        .status(404)
        .json({ message: `No se encontro el producto con el codigo ${code}` });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function create(req, res) {
  const { title, code, stock, price, category } = req.body;
  try {
    const existingProduct = await productService.getByCode(code);

    if (existingProduct) {
      return res
        .status(404)
        .json({ message: "El producto ya existe en la base de datos" });
    }
    const product = await productService.create({
      title,
      code,
      stock,
      price,
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const product = { ...req.body };

  try {
    const updatedProduct = await productService.update(id, product);

    if (!updatedProduct) {
      return res.status(404).json({
        message: `Error al actualizar el producto,  no se encontró el id ${id}`,
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;

  try {
    const productDeleted = await productService.delete(id);

    if (!productDeleted) {
      return res.status(404).json({
        message: `Error al eliminar el producto, no se encontró el id ${id}`,
      });
    }

    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
