import fs from "fs";
import { ProductManager } from "./ProductManager.js";

export class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al obtener el carrito", error.message);
      return [];
    }
  }

  async createCart() {
    try {
      const carts = await this.getCarts();
      const id = carts.length > 0 ? carts[carts.length - 1].cart.id + 1 : 1;

      const newCart = { cart: { id, products: [] } };
      carts.push(newCart);

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

      return newCart;
    } catch (error) {
      console.error("Error al crear el carrito", error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      console.log(carts);
      return carts.find((cart) => cart.id === id) || null;
    } catch (error) {
      console.error("Error al obtener el carrito", error);
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const carts = await this.getCarts();

      const cartIndex = carts.findIndex((cart) => cart.id === cartId);
      if (cartIndex === -1) throw new Error("El carrito no existe");

      const products = await new ProductManager(
        "./products.json"
      ).getProducts();
      const product = products.find((p) => p.id === productId);
      if (!product) throw new Error("El producto no existe");

      const productIndex = carts[cartIndex].products.findIndex(
        (p) => p.id === productId
      );

      if (productIndex !== -1) {
        carts[cartIndex].products[productIndex].quantity += quantity;
      } else {
        carts[cartIndex].products.push({ ...product, quantity: quantity || 1 });
      }

      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.error("Error al agregar producto al carrito", error.message);
    }
  }
}
