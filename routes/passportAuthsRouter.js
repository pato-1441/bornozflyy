import { Router } from "express";
import passport from "passport";
import { twilioService } from "../helpers/twilioConfig.js";
import Authenticated from "../middlewares/authenticate.js";

const passportAuthsRouter = Router();

// get

// login

passportAuthsRouter.get("/login", Authenticated, (req, res) => {
  res.render("login");
});

passportAuthsRouter.get("/", Authenticated, (req, res) => {
  res.redirect("login");
});

passportAuthsRouter.get("/login-error", (req, res) => {
  res.render("login-error", {});
});

passportAuthsRouter.get("/logout", (req, res) => {
  const { firstname } = req.user;
  req.logout((err) => {
    if (err) {
      return err;
    }
    res.render("logout", { firstname });
  });
  /* req.logout();
  res.render("logout", { username }); */
});

// signup

passportAuthsRouter.get("/signup", (req, res) => {
  res.render("signup");
});

passportAuthsRouter.get("/signup-error", (req, res) => {
  res.render("signup-error", {});
});

// profile

passportAuthsRouter.get("/profile/", Authenticated, (req, res) => {
  const { username } = req.user;
  res.render("profile", { username });
});

// post

passportAuthsRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login-error" }),
  (req, res) => {
    res.redirect("/");
  }
);

passportAuthsRouter.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/signup-error" }),
  (req, res) => {
    res.redirect("/");
  }
);

passportAuthsRouter.post("/createorder", Authenticated, (req, res) => {
  twilioService.sendWhatsapp(req.body);
  res.redirect("/");
});

export default passportAuthsRouter;
