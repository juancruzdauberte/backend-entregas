import { Router } from "express";
import {
  getAll,
  create,
  update,
  deleteById,
  getByCode,
  getById,
} from "../controller/product.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:pid", getById);
router.get("/:code", getByCode);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteById);

export default router;
