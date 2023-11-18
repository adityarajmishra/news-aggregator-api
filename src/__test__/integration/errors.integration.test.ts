import request from 'supertest';
import app from '../../app'; // Adjust the path to your app


describe('Error Handling Integration Tests', () => {
    it('should handle invalid routes with a 404 status', async () => {
      const response = await request(app).get('/invalid/route');
      expect(response.status).toBe(404);
      expect(response.text).toContain('404! Resource not found');
    });
  
    it('should handle validation errors with a 400 status', async () => {
      // Make a request with invalid data that triggers validation errors
      const response = await request(app)
        .post('/api/users/register')
        .send({ username: '', email: 'invalid-email', password: 'short' });
  
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  
    it('should handle authentication errors with a 401 status', async () => {
      // Make a request to an authenticated route without a valid token
      const response = await request(app)
        .get('/api/some/authenticated/route')
        .set('Authorization', 'Bearer invalidToken');
  
      expect(response.status).toBe(401);
    });
  
    it('should handle internal server errors with a 500 status', async () => {
      // This test simulates an internal server error (e.g., a database failure)
      // You can mock your services to return errors here
  
      const response = await request(app).get('/api/news/fail');
      expect(response.status).toBe(500);
      expect(response.text).toContain('Internal Server Error');
    });
  
    // Add more tests for different error scenarios
  });