import { Router } from "express";
import {
  create,
  getAll,
  getById,
  deleteById,
  deleteProductFromCart,
} from "../controller/cart.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:cid", getById);
router.post("/", create);
router.delete("/:cid", deleteById);
router.delete("/:cid/products/:pid", deleteProductFromCart);

export default router;
