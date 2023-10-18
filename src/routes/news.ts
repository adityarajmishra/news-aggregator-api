import express, { Request, Response } from 'express';
import { newsFromJSON, categories } from '../models/newsModel';
import { readNews, markNewsFavorite } from '../helpers/updateUser';
import { getReadNews, getFavNews, getUserPrefs } from '../helpers/retrievenewsFromFile';
import newsData from '../db/news-db.json';
import fetchUrl from '../helpers/fetchUrl';

const newsRoutes = express.Router();
const URL = 'https://newsapi.org/v2/';

newsRoutes.use(express.json());
newsRoutes.use(express.urlencoded({ extended: true }));

/**
 * Get all news, No need to login
 * Method: Get
 * Endpoint: /api/news/
 */
newsRoutes.get('/', (req: Request, res: Response) => {
  if (newsData.news.length > 0) {
    res.status(200).send(newsData);
  } else {
    res.status(404).send({ message: 'No news found' });
  }
});

/**
 * News by preferences
 */
newsRoutes.get('/userprefs', (req: Request, res: Response) => {
  const userpref = getUserPrefs(req.query.userId);

  if (userpref.status) {
    res.status(200).send(userpref.message);
  } else {
    res.status(404).send({ message: userpref.message });
  }
});

/**
 * Search a news
 * Method: GET
 * Endpoint: /api/news/search/keyword to search
 */
newsRoutes.get('/search/:keyword', async (req: Request, res: Response) => {
  const payload = {
    page: 1,
    q: req.params.keyword,
    apiKey: process.env.NEWS_API_KEY,
  };
  const url = new URLSearchParams(payload);

  try {
    const news = await fetchUrl(`${URL}everything?${url}`);
    res.status(200).send(newsFromJSON(news.articles));
  } catch {
    res.status(500).send('Something went wrong');
  }
});

/**
 * List all news by category
 * Method: GET
 * Endpoint: /api/news/category/categoryName
 */
newsRoutes.get('/category/:category', async (req: Request, res: Response) => {
  const payload = {
    page: 1,
    category: req.params.category,
    apiKey: process.env.NEWS_API_KEY,
  };
  const url = new URLSearchParams(payload);

  try {
    res.status(200).send(await fetchUrl(`${URL}top-headlines?${url}`));
  } catch (err) {
    res.status(400).send('Something went wrong');
  }
});

/**
 * List of all categories available
 * Method: GET
 * Endpoint: /api/news/categories
 */
newsRoutes.get('/cat', (req: Request, res: Response) => {
  const categoryList = categories();

  if (categoryList.length < 1) {
    res.status(404).send({ message: 'Server has no categories' });
  } else {
    res.status(200).send(categoryList);
  }
});

/**
 * Get read news by userid
 * Pass query params userID
 */
newsRoutes.get('/read', (req: Request, res: Response) => {
  const readNewsResult = getReadNews(req.query.id);

  if (readNewsResult.status) {
    res.status(200).send(readNewsResult.message);
  } else {
    res.status(404).send(readNewsResult.message);
  }
});

/**
 * Get favorite news by userid
 * Pass query params userID
 */
newsRoutes.get('/favorite', (req: Request, res: Response) => {
  const favNewsResult = getFavNews(req.query.id);

  if (favNewsResult.status) {
    res.status(200).send(favNewsResult.message);
  } else {
    res.status(404).send(favNewsResult.message);
  }
});

/**
 * Mark news as read
 * Pass userId in request body
 * Pass newsId in request param
 */
newsRoutes.post('/:id/read', (req: Request, res: Response) => {
  const result = readNews(req.body.user_id, req.params.id);

  if (result.status) {
    res.status(200).send({ message: 'User updated successfully' });
  } else {
    res.status(400).send({ message: result.message });
  }
});

/**
 * Mark news as favorite
 * Pass userId in request body
 * Pass newsId in request param
 */
newsRoutes.post('/:id/favorite', (req: Request, res: Response) => {
  const result = markNewsFavorite(req.params.id, req.body.user_id);

  if (result.status) {
    res.status(200).send({ message: 'User updated successfully' });
  } else {
    res.status(400).send({ message: result.message });
  }
});

export default newsRoutes;
