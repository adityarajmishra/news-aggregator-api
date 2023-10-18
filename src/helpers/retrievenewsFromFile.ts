import { filterData } from '../helpers/filetrData';

function getNews(id: any) {
  return filterData(id, 3) || [];
}

/**
 * Get the read news by the user
 * @param {userId} userId
 * @returns { message: news | "No News read", status: boolean }
 */
function getReadNews(userId: any) {
  const user = filterData(userId, 1);
  if (user) {
    const readNews = user.read_articles.map((element) => filterData(element, 3)).filter(Boolean);
    if (readNews.length > 0) {
      return { message: readNews, status: true };
    }
  }
  return { message: "No News read", status: false };
}

/**
 * Get the news by user preferences
 * @param {userId} userId
 * @returns { message: [news] | "No news found", status: boolean }
 */
function getUserPrefs(userId: any) {
  const user = filterData(userId, 1);
  if (user) {
    const newsByPref = user.user_preferences.map((element) => filterData(element, 5)).filter(Boolean);
    if (newsByPref.length > 0) {
      return { status: true, message: newsByPref };
    }
  }
  return { status: false, message: "No news found" };
}

/**
 * Get the favorite news by the user
 * @param {userId} userId
 * @returns { message: news | "No fav news", status: boolean }
 */
function getFavNews(userId: any) {
  const user = filterData(userId, 1);
  if (user) {
    const favNews = user.favorite_news.map((element) => filterData(element, 3)).filter(Boolean);
    if (favNews.length > 0) {
      return { message: favNews, status: true };
    }
  }
  return { message: "No fav news", status: false };
}

export { getNews, getReadNews, getUserPrefs, getFavNews };
