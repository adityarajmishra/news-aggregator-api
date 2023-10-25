import { v4 as uuidv4 } from 'uuid';

/**
 * Data model for news
 */
class News {
  news_id: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  categories: string;
  content: string;

  constructor(
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    categories: string,
    content: string
  ) {
    this.news_id = uuidv4();
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.categories = categories;
    this.content = content;
  }
}

function newsFromJSON(obj: any[], category: string = 'general'): News[] {
  if (!obj) return [];
  return obj.map((element) => {
    const { author, title, description, url, urlToImage, content } = element;
    return new News(author, title, description, url, urlToImage, category, content);
  });
}

function categories(): string[] {
  return [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
}

export { News, newsFromJSON, categories };
