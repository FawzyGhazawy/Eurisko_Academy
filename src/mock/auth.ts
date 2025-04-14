// src/mock/login.mock.ts
import { MockMethod } from 'vite-plugin-mock';
import { generateResponse, generateToken } from './mock.util';

const mock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: ({ body }: { body: any }) => {
      console.log('Mock Server: /api/login endpoint hit');
      console.log('Raw request body:', body); // Log the raw body for debugging

      if (!body || !body.email || !body.password) {
        console.log('Mock Server: Missing email or password in request body');
        return generateResponse({}, 400, 'Missing email or password');
      }

      const { email, password } = body;

      if (email === 'academy@gmail.com' && password === 'academy123') {
        console.log('Mock Server: Valid credentials provided');
        const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365; // 1 year
        const accessToken = generateToken({ email, password, expiresIn });
        console.log('Mock Server: Sending successful response with access token');
        return generateResponse({ expiresIn, accessToken });
      }

      console.log('Mock Server: Invalid credentials provided');
      return generateResponse({}, 401, 'Invalid Credentials!');
    },
  },
];

export default mock;