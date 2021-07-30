import { Request, Response } from "express";
import {
  getAnimeByName,
  getAnimeSchedule,
  getCompleteAnime,
  getOngoingAnime,
} from "../service/animeservice";
import { response } from "../utils/response";
import { StatusCodes } from "http-status-codes";

export async function fetchOngoing(req: Request, res: Response) {
  let page = parseInt(req.params.id);
  try {
    let ongoing = await getOngoingAnime(page);
    res.status(StatusCodes.OK).send(response("success", ongoing));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response("error", []));
  }
}

export async function fetchCompletedAnime(req: Request, res: Response) {
  let page = parseInt(req.params.id);
  try {
    let completed = await getCompleteAnime(page);
    res.status(StatusCodes.OK).send(response("success", completed));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response("error", []));
  }
}

export async function fetchSchedule(req: Request, res: Response) {
  try {
    let schedule = await getAnimeSchedule();
    res.status(StatusCodes.OK).send(response("success", schedule));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response("error", []));
  }
}

export async function fetchByName(req: Request, res: Response) {
  let title = req.query.title as string;
  try {
    let detail = await getAnimeByName(title);
    res.status(StatusCodes.OK).send(response("success", detail));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response("error", []));
  }
}
