import { Router } from "express";
import { getGenres, getTop, getMangaById, getPopular, getRecents } from "./api";
import { PagesController } from "./controllers/pages.controller";
import { SearchController } from "./controllers/search.controller";
import { ChaptersController } from "./controllers/chapters.controller";
import got from "got";

const pagesController = new PagesController();
const searchController = new SearchController();
const chaptersController = new ChaptersController();

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
  const a = await got("https://mangalivre.net/home/getFeaturedSeries.json");

  console.log("a", JSON.parse(a.body));
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

export default router;
