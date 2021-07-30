import {
  CompleteAnime,
  OngoingAnime,
  ReleaseSchedule,
  AnimeDetailSchedule,
  AnimeDetail,
} from "../models/anime";
import * as cheerio from "cheerio";
import axios from "axios";
import {
  ANIME_DETAIL_URL,
  BASE_URL,
  COMPLETE_URL,
  ONGOING_URL,
  SCHEDULE_URL,
} from "../config/constant";

export async function getOngoingAnime(page: number = 0): Promise<any> {
  //delcare empty array of object OngoingAnime
  const ongoingAnimList: OngoingAnime[] = [];
  const pageUrl = page > 0 ? `${ONGOING_URL}/page/${page}` : ONGOING_URL;
  const url = BASE_URL + pageUrl;

  //fetch page based on url
  const ongoingAnime = axios.get(url).then((response) => {
    let $ = cheerio.load(response.data);
    let ongoingHTML = $(".venz>ul>li");

    //loop every element from HTML
    ongoingHTML.each((index, element) => {
      let title = $(element).find(".detpost>.thumb>a>.thumbz>.jdlflm").text();
      let currentEpisode = $(element).find(".detpost>.epz").text();
      let releaseDay = $(element).find(".detpost>.epztipe").text();
      let releaseDate = $(element).find(".detpost>.newnime").text();
      let link = $(element).find(".detpost>.thumb>a").attr("href");
      let thumbnail = $(element)
        .find(".detpost>.thumb>a>.thumbz>img")
        .attr("src");
      ongoingAnimList.push({
        title,
        currentEpisode,
        releaseDate,
        releaseDay,
        link,
        thumbnail,
      });
    });
    //return resolved promise
    return ongoingAnimList;
  });
  return ongoingAnime;
}

export async function getCompleteAnime(page: number = 0): Promise<any> {
  //delcare empty array of object CompleteAnime
  const completeAnimeList: CompleteAnime[] = [];
  const pageUrl = page > 0 ? `${COMPLETE_URL}/page/${page}` : COMPLETE_URL;
  const url = BASE_URL + pageUrl;

  //fetch page based on url
  const completedAnime = axios.get(url).then((response) => {
    let $ = cheerio.load(response.data);
    let completedHTML = $(".venz>ul>li");

    //loop every element from HTML
    completedHTML.each((index, element) => {
      let title = $(element).find(".detpost>.thumb>a>.thumbz>.jdlflm").text();
      let totalEpisode = $(element).find(".detpost>.epz").text();
      let completeDate = $(element).find(".detpost>.newnime").text();
      let rating = $(element).find(".detpost>.epztipe").text();
      let link = $(element).find(".detpost>.thumb>a").attr("href");
      let thumbnail = $(element)
        .find(".detpost>.thumb>a>.thumbz>img")
        .attr("src");
      completeAnimeList.push({
        title,
        totalEpisode,
        completeDate,
        rating,
        link,
        thumbnail,
      });
    });
    //return resolved promise
    return completeAnimeList;
  });
  return completedAnime;
}

export async function getAnimeSchedule(): Promise<any> {
  const scheduleList: ReleaseSchedule[] = [];
  const url = BASE_URL + SCHEDULE_URL;

  const schedule = axios.get(url).then((response) => {
    let $ = cheerio.load(response.data);
    let scheduleHTML = $(".kgjdwl321");
    scheduleHTML.find(".kglist321").each((index, list) => {
      let day = $(list).find("h2").text();
      let animeArray: AnimeDetailSchedule[] = [];
      $(list)
        .find("ul>li")
        .each((idx, detail) => {
          let title = $(detail).find("a").text();
          let url = $(detail).find("a").attr("href");
          animeArray.push({ title: title, url });
        });
      scheduleList.push({ dayName: day, anime: animeArray });
    });
    return scheduleList;
  });
  return schedule;
}

export async function getAnimeByName(name: string): Promise<any> {
  let anime = <AnimeDetail>{};
  let convertedName = name.replace(" ", "-").toLowerCase();
  const url = `${BASE_URL}${ANIME_DETAIL_URL}${convertedName}`;
  let animeDetail = axios.get(url).then((response) => {
    let $ = cheerio.load(response.data);
    let detailHTML = $(".fotoanime");
    let data: string[] = [];
    let animeDataList = detailHTML.find(".infozin>.infozingle>p");

    animeDataList.each((index, dataName) => {
      let title = $(dataName).text().split(": ")[1];
      data.push(title);
    });
    let synopsis = detailHTML.find(".sinopc").text();

    anime.title = data[0];
    anime.japaneseTitle = data[1];
    anime.rating = data[2];
    anime.producer = data[3];
    anime.type = data[4];
    anime.status = data[5];
    anime.totalEpisode = data[6];
    anime.duration = data[7];
    anime.releaseDate = data[8];
    anime.studio = data[9];
    anime.genre = data[10];
    anime.synopsis = synopsis;
    return anime;
  });
  return animeDetail;
}
