import axios, { AxiosInstance } from "axios";
import { Anime } from "../types/Anime";

/**
 * Create a reusable Axios instance for API calls.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  timeout: 10000, // Set a timeout for API requests
});

/**
 * Utility function to handle API errors.
 * Logs the error and throws a user-friendly message.
 * @param error - The error object from Axios or other sources.
 */
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
  throw new Error("An error occurred while fetching data. Please try again later.");
};

 
interface FetchAnimeResponse {
  data: Anime[];
  totalPages: number;
}


export const fetchAnimeData = async (
  searchQuery: string,
  page: number
): Promise<FetchAnimeResponse> => {
  try {
    const { data } = await apiClient.get("/anime", {
      params: { q: searchQuery, page },
    });
    return {
      data: data.data as Anime[],
      totalPages: data.pagination.last_visible_page,
    };
  } catch (error) {
    handleApiError(error); // This will always throw an error
    throw new Error("This line will never be reached, but satisfies TypeScript.");
  }
};

export const fetchAnimeDetails = async (id: string): Promise<Anime> => {
  try {
    const { data } = await apiClient.get(`/anime/${id}`);
    return data.data as Anime;
  } catch (error) {
    handleApiError(error);
    return undefined as never; 
  }
};
