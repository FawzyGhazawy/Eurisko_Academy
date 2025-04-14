// src/mock/users.mock.ts
import { MockMethod } from 'vite-plugin-mock';
import { ApiHeaders } from './mock.type';
import { generateResponse, getUnAuthorizedResponse, validateToken } from './mock.util';
import usersData from './users.json';

const mock: MockMethod[] = [
  {
    url: '/api/users',
    method: 'get',
    timeout: 2000,
    response: ({ query, headers }: { query: { search?: string }; headers: ApiHeaders }) => {
      console.log('Mock Server: /api/users endpoint hit');

      if (validateToken(headers.authorization)) {
        console.log('Mock Server: Valid token provided');
        let users = [...usersData.users];
        const { search } = query;
        const lowerCaseSearch = search?.toLowerCase() || '';
        if (lowerCaseSearch) {
          users = usersData.users.filter(
            (user) =>
              user.firstName.toLowerCase().includes(lowerCaseSearch) ||
              (user.lastName && user.lastName.toLowerCase().includes(lowerCaseSearch)) ||
              user.email.toLowerCase().includes(lowerCaseSearch)
          );
        }
        console.log('Mock Server: Sending successful response with users data');
        return generateResponse({ users });
      }

      console.log('Mock Server: Invalid or missing token');
      return getUnAuthorizedResponse();
    },
  },
];

export default mock;