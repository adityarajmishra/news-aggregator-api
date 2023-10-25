import userData from '../db/user-db.json';
import newsData from '../db/news-db.json';

export function filterData(id: any, type: number) {
  switch (type) {
    case 1:
      return userData.users.find((data) => data.user_id === id) || [];
    case 2:
      return userData.users.filter((data) => data.user_id !== id);
    case 3:
      return newsData.news.find((data) => data.news_id === id) || [];
    case 4:
      return userData.users.find((data) => data.user_email === id) || [];
    case 5:
      return newsData.news.filter((data) => data.categories === id);
    default:
      return [];
  }
  
}
