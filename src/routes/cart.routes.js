import { Router } from "express";
import {
  create,
  getAll,
  deleteById,
  deleteProductFromCart,
  updateCart,
  renderCartDetail,
  addProductToCart,
} from "../controller/cart.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:cid", renderCartDetail);
router.post("/", create);
router.put("/:cid", updateCart);
router.delete("/:cid", deleteById);
router.post("/:cid/products/:pid", addProductToCart);
router.delete("/:cid/products/:pid", deleteProductFromCart);

export default router;
