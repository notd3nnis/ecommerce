import express from "express";
import {
  createNewProduct,
  getProducts,
  getAProduct,
  updateProduct,
  removeProduct,
} from "./product.controller";
import { auth, role } from "../../middleware/auth";
import { createProductSchema, updateProductSchema } from "./product.validations";
import { validate } from "../../middleware/validate";

const router = express.Router();

router.get("/check", () => console.log("Inventory route is working"));

// this is role based so the only person authorized to create a product is the admin, so we will add an auth middleware later to check if the user is an admin before allowing them to create a product.
router.use(auth)            
router.post("/create", validate(createProductSchema), createNewProduct);
router.get("/products", getProducts);
router.get("/products/:id", getAProduct);

router.use(role(['admin']))  // only admin can update or delete a product.
router.put("/products/:id", validate(updateProductSchema), updateProduct);
router.delete("/products/:id", removeProduct);


export default router;
