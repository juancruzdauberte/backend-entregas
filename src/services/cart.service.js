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
}

export default new CartService();
