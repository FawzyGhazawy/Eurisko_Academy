import { MockMethod } from 'vite-plugin-mock';
import { generateResponse, generateToken } from './mock.util';

const mock: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 2000,
    response: ({ body: { body } }: { body: { body: { email: string; password: string } } }) => {
      console.log('Mock Server: /api/login endpoint hit');
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