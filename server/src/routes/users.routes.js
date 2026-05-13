import { Router } from "express";

const router = Router();

router.post("/login", loginController)
router.post("/register", registerController)
router.post("/logout", logoutController)
router.post("/add_to_activity", Controller)
router.post("/get_all_activity", Controller)


export default router