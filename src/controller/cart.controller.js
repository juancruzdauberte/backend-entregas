import cartService from "../services/cart.service.js";

export async function create(req, res) {
  const { products } = req.body;
  try {
    const cart = await cartService.create({ products });

    if (!cart) {
      return res.status(404).json({ message: "Error al crear el carrito" });
    }

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function getAll(req, res) {
  try {
    const carts = await cartService.getAll();

    if (carts.length === 0) {
      return res.status(404).json({ message: "No hay carritos disponibles" });
    }

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function getById(req, res) {
  const { cid: id } = req.params;
  try {
    const cart = await cartService.getById(id);

    if (!cart) {
      return res
        .status(404)
        .json({ message: `No se encontro el carrito con el id ${id}` });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function deleteById(req, res) {
  const { cid: id } = req.params;

  try {
    const cart = await cartService.deleteById(id);

    if (!cart) {
      return res
        .status(404)
        .json({ message: `No se encontro el carrito con el id ${id}` });
    }

    res.status(200).json({ message: `Carrito con el id ${id} eliminado` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function deleteProductFromCart(req, res) {
  const { cid: cartId, pid: productId } = req.params;
  try {
    const cart = await cartService.deleteProductFromCart(cartId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
