import { API_KEY } from '../../config.js';

export const NewsService = {
  getTopHeadlines: async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=br&apiKey=${API_KEY}`
      );
      const data = await response.json();
      return data.articles || [];
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
};