import productService from "../services/product.service.js";

export async function getAll(req, res) {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await productService.getPaginated({
      limit,
      page,
      sort,
      query,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export async function getById(req, res) {
  const { pid } = req.params;
  try {
    const product = await productService.getById(pid);
    if (!product) {
      return res
        .status(404)
        .json({ message: `No se encontro el producto con el codigo ${pid}` });
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

export async function renderProductDetail(req, res) {
  const { pid } = req.params;

  const product = await productService.getById(pid);

  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }

  res.render("productDetail", {
    product,
  });
}

export async function renderProducts(req, res) {
  const { limit = 10, page = 1, sort, query, cartId } = req.query;

  const result = await productService.getPaginated({
    limit,
    page,
    sort,
    query,
  });

  if (!result) return res.status(500).send("Error al obtener productos");

  res.render("index", {
    products: result.payload,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevLink: result.prevLink,
    nextLink: result.nextLink,
  });
}
