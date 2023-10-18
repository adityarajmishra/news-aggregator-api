import axios from 'axios';

/**
 * Global function to fetch news
 * @param {url to fetch news from} url
 * @returns Promise that either resolves or rejects
 */
export function fetchUrl(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((result) => {
        resolve(result.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
