import request from 'supertest';
import app from '../../app'; // Adjust the path to your app

describe('Middleware Integration Tests', () => {
    it('should apply authentication middleware', async () => {
      // Simulate a request to a protected route with valid credentials
      const response = await request(app)
        .get('/api/protected/route')
        .set('Authorization', 'Bearer validToken');
  
      expect(response.status).toBe(200);
      // Add more assertions for expected data or behavior
    });
  
    it('should rate limit requests', async () => {
      // Simulate making too many requests within a short time to trigger rate limiting
      const responses = await Promise.all(
        new Array(110).fill(0).map(() => request(app).get('/api/rate/limited/route'))
      );
  
      // The first 100 requests should have a 200 status, but the 101st request should be rate-limited (429)
      expect(responses[100].status).toBe(429);
    });
  
    // Add more tests for other middleware
  });

  