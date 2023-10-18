import { URLSearchParams } from 'url';
import { fetchUrl } from '../helpers/fetchUrl';
import { newsFromJSON, categories } from '../models/newsModel';
import { writeToFile } from '../helpers/fileOperations';

const URL = 'https://newsapi.org/v2/';

/**
 * To fetch the news globally, here used for cron-job to keep news refreshing every 14 minutes,
 * which is ~(24*60)/100
 * 100 is the number of requests available for free by newsapi.org
 *
 * it just writes to file
 */
const categoriesList = categories();

async function getNews() {
  for await (const category of categoriesList) {
    const payload = {
      page: 1,
      pageSize: 50,
      q: category,
      apiKey: process.env.NEWS_API_KEY as string, // Ensure you have the appropriate type for process.env.NEWS_API_KEY
    };

    const url = new URLSearchParams(payload);
    try {
      const news = await fetchUrl(`${URL}everything?${url}`);
      const addNews = newsFromJSON(news.articles, category);
      const allNews = new Object();
      allNews['news'] = addNews;
      writeToFile(allNews, 'news');
      console.log(news);
    } catch (error) {
      console.log('Something went wrong:', error);
    }
  }
}

export default getNews;