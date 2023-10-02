import express from "express"
import session from "express-session";
import signupController from "../controllers/signupController.js";
import loginController from "../controllers/loginController.js";
// import homeController from "../controllers/homeController.js";
import { homeControllerGet, homeControllerPost } from "../controllers/homeController.js";

const router = express.Router();

router.get("/", homeControllerGet);

router.get("/signup", (req, res) => {
    res.render("signup", {user: session.user, msg: ""});
});

router.post("/signup", signupController);

router.get("/login", (req, res) => {
    res.render("login", {user: session.user, msg: ""});
});

router.post("/login", loginController);

router.get("/logout", (req, res) => {
    session.user = null;
    res.redirect("/");
});

router.get("/profile", (req, res) => {
    res.render("profile", {user: session.user});
})

router.post("/", homeControllerPost);

export default router;
