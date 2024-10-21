import axios from "axios";
const API_KEY = "38825211-dba5e3ee1b1336e1f9cd9ebac";
const URL = "https://pixabay.com/api/";

export async function fetchImages<T>(
  searchQuery: string,
  per_page: number,
  page: number
): Promise<T | undefined> {
  try {
    const response = await axios.get<T>(URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: per_page,
        page: page,
      },
    });
    return response.data;
  } catch (err) {
    console.log("FETCH ERROR: " + err);
  }
}
