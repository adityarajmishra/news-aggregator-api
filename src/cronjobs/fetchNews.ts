import cron from 'node-cron';
import getNews from '../controllers/getNews';

/**
 * Fetches the news from NewsAPI.org every 14 mins
 */
const cronjob = cron.schedule('*/5 * * * *', () => {
    console.log("Fetching news from NewsAPI");
    getNews();
});

export default cronjob;
