import userData from '../db/user-db.json';
import newsData from '../db/news-db.json';

/**
 * To filter data as required
 * @param {newsId | userId} id
 * @param {1,2,3,4} type
 * @returns arrayOf(data)
 */
export function filterData(id: any, type: number) {
  switch (type) {
    case 1:
      return userData.users.find((data) => data.user_id === id) || null;
    case 2:
      return userData.users.filter((data) => data.user_id !== id);
    case 3:
      return newsData.news.find((data) => data.news_id === id) || null;
    case 4:
      return userData.users.find((data) => data.user_email === id) || null;
    case 5:
      return newsData.news.filter((data) => data.categories === id);
    default:
      return [];
  }
}
