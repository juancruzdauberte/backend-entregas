import { Product } from "../models/product.model.js";

class ProductService {
  async getAll() {
    return await Product.find();
  }

  async getByCode(code) {
    return await Product.findOne({ code });
  }

  async getById(id) {
    return await Product.findById(id);
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

  async getPaginated({ limit = 10, page = 1, sort, query }) {
    const filter = {};

    if (query) {
      if (query === "available") {
        filter.stock = { $gt: 0 };
      } else {
        filter.category = query;
      }
    }

    const options = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    };

    const sortOption =
      sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

    const [products, totalDocs] = await Promise.all([
      Product.find(filter, null, options).sort(sortOption),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    if (products.length === 0) {
      return {
        status: "error",
        message: "No se encontraron productos con los filtros aplicados",
        payload: [],
        totalPages: 0,
        prevPage: null,
        nextPage: null,
        page: parsedPage,
        hasPrevPage: false,
        hasNextPage: false,
        prevLink: null,
        nextLink: null,
      };
    }
    return {
      status: "success",
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? parseInt(page) + 1 : null,
      page: parseInt(page),
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `?page=${page - 1}&limit=${limit}` : null,
      nextLink: hasNextPage
        ? `?page=${parseInt(page) + 1}&limit=${limit}`
        : null,
    };
  }
}

export default new ProductService();
