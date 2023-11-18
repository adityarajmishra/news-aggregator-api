import request from 'supertest';
import app from '../../app'; // Adjust the path to your app

describe('User Authentication Integration Tests', () => {
  it('should allow user registration', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'testpassword' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user_id');
  });

  it('should allow user login', async () => {
    // First, register a user (you can use the code from the previous test)
    
    const loginResponse = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'testpassword' });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
  });

  it('should protect authenticated routes', async () => {
    // First, register and log in a user (you can use the code from the previous tests)
    
    // Now, access an authenticated route (requires a valid token)
    const authenticatedResponse = await request(app)
      .get('/api/some/authenticated/route')
      .set('Authorization', 'Bearer yourAuthToken');

    expect(authenticatedResponse.status).toBe(200);
    // Add more assertions based on the behavior of your authenticated routes
  });

  // Add more tests for user authentication
});
