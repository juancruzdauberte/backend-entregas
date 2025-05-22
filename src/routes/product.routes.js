import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteById,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteById);

export default router;
