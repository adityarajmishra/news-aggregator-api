import request from 'supertest';
import app from '../../app'; // Adjust the path to your app

describe('Request Validation Integration Tests', () => {
    it('should validate requests with valid data', async () => {
      // Simulate a request with valid data that should pass validation
      const response = await request(app)
        .post('/api/users/register')
        .send({ username: 'validUsername', email: 'valid-email@example.com', password: 'validPassword' });
  
      expect(response.status).toBe(200);
      // Add more assertions for expected data or behavior
    });
  
    it('should reject requests with invalid data', async () => {
      // Simulate a request with invalid data that should fail validation
      const response = await request(app)
        .post('/api/users/register')
        .send({ username: '', email: 'invalid-email', password: 'short' });
  
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  
    // Add more tests for other validation scenarios
  });
  