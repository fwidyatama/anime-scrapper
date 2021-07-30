import { Router } from "express";
import {
  fetchOngoing,
  fetchCompletedAnime,
  fetchSchedule,
  fetchByName,
} from "../controllers/anime";

const router = Router();
router.get("/ongoing/:id*?", fetchOngoing);
router.get("/complete/:id*?", fetchCompletedAnime);
router.get("/schedule", fetchSchedule);
router.get("/detail", fetchByName);

export default router;
