export interface OngoingAnime {
  title: string;
  currentEpisode: string;
  releaseDay: string;
  releaseDate: string;
  link: string | undefined;
  thumbnail: string | undefined;
}
export interface CompleteAnime {
  title: string;
  totalEpisode: string;
  completeDate: string;
  rating: string;
  link: string | undefined;
  thumbnail: string | undefined;
}
export interface ReleaseSchedule {
  dayName: string;
  anime: AnimeDetailSchedule[] | undefined;
}
export interface AnimeDetailSchedule {
  title: string;
  url: string | undefined;
}

export interface AnimeDetail {
  title: string;
  japaneseTitle: string;
  rating: string;
  producer: string;
  type: string;
  status: string;
  totalEpisode: string;
  duration: string;
  releaseDate: string;
  studio: string;
  genre: string;
  synopsis: string;
}
