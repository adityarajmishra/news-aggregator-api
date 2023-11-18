import request from 'supertest';
import app from '../../app'; // Adjust the path to your app

describe('API Endpoint Integration Tests', () => {
  it('should return a list of news when calling the /api/news endpoint', async () => {
    const response = await request(app).get('/api/news');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('news');
  });

  // Add more tests for other API endpoints
});
