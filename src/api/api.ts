import axios from "axios";
export const api = axios.create({
  baseURL: "https://newsapi.org/v2",
  params: { apiKey: process.env.NEWS_API_KEY }
});
