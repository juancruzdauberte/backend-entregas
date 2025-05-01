import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (!fs.existsSync(this.path)) return [];
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al obtener todos los productos");
      return [];
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find((product) => product.id === id) || null;
    } catch (error) {
      console.error("Error al obtener el producto");
    }
  }

  async updateProduct(id, uptadedData) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index === -1) throw new Error("El producto no existe");

      products[index] = { ...products[index], ...uptadedData };

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

      return products[index];
    } catch (error) {
      console.error("Error al actualizar el producto");
    }
  }

  async addProduct({
    title,
    description,
    code,
    stock,
    price,
    thumbnails,
    status,
    category,
  }) {
    try {
      const products = await this.getProducts();

      if (products.some((product) => product.code === code)) {
        throw new Error("El codigo ya existe para un producto");
      }

      const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

      const newProduct = {
        id,
        title,
        description,
        stock,
        price,
        thumbnails,
        code,
        status,
        category,
      };

      products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

      return newProduct;
    } catch (error) {
      console.error("Error al agregar el producto");
    }
  }

  async deleteProduct(code) {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter((product) => product.code !== code);

      if (products.length === newProducts.length)
        throw new Error("El producto no existe");

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(newProducts, null, 2)
      );
    } catch (error) {
      console.error("Error al eliminar un producto");
    }
  }
}
