import { Product } from "../models/product.model.js";

class ProductService {
  async getAll() {
    return await Product.find();
  }

  async getByCode(code) {
    return await Product.find({ code });
  }

  async create(product) {
    return await Product.create(product);
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductService();
