import { Router } from "express";
import userRoutes from "./users.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("index", { user: req.session.user });
});

router.use("/auth", userRoutes);
export default router;
