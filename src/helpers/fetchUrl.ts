import axios from 'axios';

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
