import { filterData } from '../helpers/filetrData';

// Define an interface for the user data structure
interface UserData {
  user_id: string;
  user_name: string;
  user_email: string;
  password: string;
  user_type: string;
  user_preferences: string[];
  liked_news: string[];
  created_at: string;
  read_articles: string[]; // You might want to specify the type of these properties
  favorite_news: string[]; // based on their actual data type
}

function getNews(id: any) {
  return filterData(id, 3) || [];
}

function getReadNews(userId: any) {
  const user = filterData(userId, 1) as UserData | null;
  if (user) {
    const readNews = user.read_articles.map((element) => filterData(element, 3)).filter(Boolean);
    if (readNews.length > 0) {
      return { message: readNews, status: true };
    }
  }
  return { message: "No News read", status: false };
}

function getUserPrefs(userId: any) {
  const user = filterData(userId, 1) as UserData | null;
  if (user) {
    const newsByPref = user.user_preferences.map((element) => filterData(element, 5)).filter(Boolean);
    if (newsByPref.length > 0) {
      return { status: true, message: newsByPref };
    }
  }
  return { status: false, message: "No news found" };
}

function getFavNews(userId: any) {
  const user = filterData(userId, 1) as UserData | null;
  if (user) {
    const favNews = user.favorite_news.map((element) => filterData(element, 3)).filter(Boolean);
    if (favNews.length > 0) {
      return { message: favNews, status: true };
    }
  }
  return { message: "No fav news", status: false };
}

export { getNews, getReadNews, getUserPrefs, getFavNews };
