import { Router } from "express";
import { getGenres, getTop, getMangaById, getPopular, getRecents } from "./api";
import { PagesController } from "./controllers/pages.controller";
import { SearchController } from "./controllers/search.controller";
import { ChaptersController } from "./controllers/chapters.controller";
import { checkDuplicateEmail } from "./middlewares/verifySignUp";
import { AuthController } from "./controllers/auth.controller";
import { verifyToken } from "./middlewares/verifyToken";
import { verifyUser } from "./middlewares/verifyUser";
import { FavoriteController } from "./controllers/favorite.controler";
import { ForgotPasswordController } from "./controllers/forgot-password.controller";
import { NotificationController } from "./controllers/notification.controller";

const pagesController = new PagesController();
const searchController = new SearchController();
const chaptersController = new ChaptersController();
const authController = new AuthController();
const favoriteController = new FavoriteController();
const forgotPassword = new ForgotPasswordController();
const notificationController = new NotificationController();

const router = Router();

router.get("/search/", searchController.getSearchManga);

router.get("/chapters/:id/", chaptersController.getAllChapters);

router.get("/chapters/:id/:page/", chaptersController.getDoubleChapterPerPage);

router.get("/pages/:id", pagesController.getPages);

router.get("/genres/", (_req, res) => {
  getGenres().then((response) => {
    res.send(response);
  });
});

router.get("/recents", async (req, res) => {
  res.redirect("/recents/1");
});

router.get("/recents/:page", (req, res) => {
  const page = req.params.page;
  getRecents(page).then((response) => {
    res.send(response);
  });
});

router.get("/popular/", async (_req, res) => {
  res.redirect("/popular/1");
});

router.get("/popular/:page", (req, res) => {
  const page = req.params.page;
  getPopular(page).then((response) => {
    res.send(response);
  });
});

router.get("/top/:page", (req, res) => {
  const page = req.params.page;
  getTop(page).then((response) => {
    res.send(response);
  });
});

router.get("/top/", async (_req, res) => {
  res.redirect("/top/1");
});

router.get("/manga/:id", async (req, res) => {
  const id = req.params.id;

  getMangaById(id)
    .then((response) => {
      res.send(response);
    })
    .catch(() => res.sendStatus(404));
});

// AUTH
router.post("/auth/signup", checkDuplicateEmail, authController.signup);
router.post("/auth/signin", authController.signin);
router.post("/auth/google/signin", authController.signinWithGoogle);
router.post("/auth/forgotPassword", forgotPassword.createToken);
router.post("/auth/resetPassword", forgotPassword.resetPassword);

// FAVORITES
router.get(
  "/favorites",
  verifyToken,
  verifyUser,
  favoriteController.getAllFavorites
);
router.post(
  "/favorites/new",
  verifyToken,
  verifyUser,
  favoriteController.createNewFavorite
);
router.post(
  "/favorites/del",
  verifyToken,
  verifyUser,
  favoriteController.deleteFavorite
);

// PUSH NOTIFICATION
router.post("/notification/push", notificationController.pushNotification);
router.post(
  "/notification/add",
  notificationController.addPushTokenNotification
);
router.post(
  "/notification/del",
  notificationController.deleteTokenNotification
);

export default router;
