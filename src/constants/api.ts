import axios from "axios";
import { Anime } from "../types/Anime";

export const fetchAnimeData = async (searchQuery: string, page: number) => {
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${searchQuery}&page=${page}`
    );
    return {
      data: response.data.data as Anime[],
      totalPages: response.data.pagination.last_visible_page,
    };
  } catch (error) {
    console.error("Error fetching anime:", error);
    throw new Error("Failed to fetch anime. Please try again later.");
  }
};