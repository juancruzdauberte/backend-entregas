import fs from "fs";
import { ProductManager } from "./ProductManager";

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCart() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al obtener el carrito");
      return [];
    }
  }

  async createCart() {
    try {
      const carts = await this.getCart();
      const id = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

      const newCart = { id, products: [] };
      carts.push(newCart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

      return newCart;
    } catch (error) {
      console.error("Error al crear el carrito", error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCart();
      return carts.find((cart) => cart.id === id) || null;
    } catch (error) {
      console.error("Error al obtener el carrito", error);
    }
  }

  async addProductToCart(cartId, productId) {}
}
