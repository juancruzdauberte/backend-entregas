import { Cart } from "../models/cart.model.js";

class CartService {
  async create(cart) {
    return await Cart.create(cart);
  }

  async getAll() {
    return await Cart.find();
  }

  async getById(id) {
    return await Cart.findById(id);
  }

  async deleteById(id) {
    return await Cart.findByIdAndDelete(id);
  }

  async updateCart(id, data) {
    return await Cart.findByIdAndUpdate(id, { products: data }, { new: true });
  }

  async addProductToCart(cartId, productId) {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new Error(`Carrito con id ${cartId} no encontrado`);
    }
    const productInCart = cart.products.find(
      (p) => p.product.toString() === productId
    );
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
    await cart.save();
    return cart;
  }

  async deleteProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    if (cart.products.length === 0) {
      await Cart.findByIdAndDelete(cid);
      return null;
    }

    const updatedCart = await Cart.findByIdAndUpdate(
      cid,
      {
        $pull: { products: { product: pid } },
      },
      { new: true }
    );

    if (updatedCart.products.length === 0) {
      await Cart.findByIdAndDelete(cid);
      return null;
    }

    return updatedCart;
  }

  async createCartEmpty() {
    return await Cart.create({ products: [] });
  }
}

export default new CartService();
