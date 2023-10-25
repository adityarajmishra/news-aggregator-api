import { URLSearchParams } from 'url';
import { fetchUrl } from '../helpers/fetchUrl';
import { newsFromJSON, categories } from '../models/newsModel';
import { writeToFile } from '../helpers/fileOperations';

const URL = 'https://newsapi.org/v2/';

const categoriesList = categories();

async function getNews() {
  for await (const category of categoriesList) {
    const payload = {
      page: '1', // Convert to string
      pageSize: '50', // Convert to string
      q: category,
      apiKey: process.env.NEWS_API_KEY as string,
    };

    const url = new URLSearchParams(payload);
    try {
      const news = await fetchUrl(`${URL}everything?${url}`);
      const addNews = newsFromJSON(news.articles, category);
      const allNews: { news: any } = { news: addNews };
      writeToFile(allNews, 'news');
      console.log(news);
    } catch (error) {
      console.log('Something went wrong:', error);
    }
  }
}

export default getNews;
