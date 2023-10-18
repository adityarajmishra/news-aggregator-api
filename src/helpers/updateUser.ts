import userData from '../db/user-db.json';
import { filterData } from '../helpers/filetrData';
import { writeToFile } from '../helpers/fileOperations';

/**
 * To update the whole user
 * @param {userId} userId
 * @param {userBody} userParams
 * @returns { message: string, status: boolean }
 */
function updateUser(userId: any, userParams: Record<string, any>) {
  const userToUpdate = filterData(userId, 1);

  if (userToUpdate) {
    Object.assign(userToUpdate[0], userParams);
    const usersData = filterData(userId, 2);
    usersData.users.push(userToUpdate[0]);
    return writeToFile(userData, 'user');
  }

  return {
    message: 'User not found',
    status: false,
  };
}

/**
 * To mark the news as read
 * @param {userId} userId
 * @param {newsId} newsId
 * @returns { message: string, status: boolean }
 */
function readNews(userId: any, newsId: any) {
  const userToUpdate = filterData(userId, 1);

  if (userToUpdate) {
    if (!userToUpdate[0].read_articles.includes(newsId)) {
      userToUpdate[0].read_articles.push(newsId);
      userData.users = filterData(userId, 2);
      userData.users.push(userToUpdate[0]);
      return writeToFile(userData, 'user');
    }

    return {
      message: 'News already read by user',
      status: false,
    };
  }

  return {
    message: 'User not found',
    status: false,
  };
}

/**
 * To mark the news as Favorite
 * @param {userId} userId
 * @param {newsId} newsId
 * @returns { message: string, status: boolean }
 */
function markNewsFavorite(userId: any, newsId: any) {
  const userToUpdate = filterData(userId, 1);

  if (userToUpdate) {
    if (!userToUpdate[0].favorite_news.includes(newsId)) {
      userToUpdate[0].favorite_news.push(newsId);
      userData.users = filterData(userId, 2);
      userData.users.push(userToUpdate[0]);
      return writeToFile(userData, 'user');
    }

    return {
      message: 'Already Added to Favorites',
      status: false,
    };
  }

  return {
    message: 'User not found',
    status: false,
  };
}

/**
 * To update newsPreferences
 * @param {userId} userId
 * @param {newsPreference} newsPreference
 * @returns { message: string, status: boolean }
 */
function updateNewsPreferences(userId: any, newsPreference: any) {
  const userToUpdate = filterData(userId, 1);

  if (userToUpdate) {
    if (!userToUpdate[0].user_preferences.includes(newsPreference)) {
      userToUpdate[0].user_preferences.push(newsPreference);
      userData.users = filterData(userId, 2);
      userData.users.push(userToUpdate[0]);
      return writeToFile(userData, 'user');
    }

    return {
      message: 'Preference already exists',
      status: false,
    };
  }

  return {
    message: 'User not found',
    status: false,
  };
}

export {
  updateUser,
  readNews,
  updateNewsPreferences,
  markNewsFavorite,
};
