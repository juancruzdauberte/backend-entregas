import { Router } from "express";
import { renderCartDetail } from "../../controller/cart.controller.js";
import {
  renderProductDetail,
  renderProducts,
} from "../../controller/product.controller.js";

const router = Router();

router.get("/", renderProducts);
router.get("/products/:pid", renderProductDetail);
router.get("/carts/:cid", renderCartDetail);

export default router;
