import express from "express";
import passport from "passport";
import {
  getAdminStats,
  getAdminUsers,
  logout,
  myProfle,
} from "../controller/user.js";
import { authorizedAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile "],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    scope: ["profile"],
  })
);

router.get("/me", isAuthenticated, myProfle);

router.get("/logout", logout);

//admin routes

router.get("/admin/users", isAuthenticated, authorizedAdmin, getAdminUsers);

router.get("/admin/stats", isAuthenticated, authorizedAdmin, getAdminStats);

export default router;
