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
      if (validateToken(headers.authorization)) {
        const { search } = query;
        const lowerCaseSearch = search?.toLowerCase() || '';
        if (lowerCaseSearch) {
          return generateResponse({
            users: usersData.users.filter(
              (user: any) =>
                user.firstName.toLowerCase().includes(lowerCaseSearch) ||
                (user.lastName && user.lastName.toLowerCase().includes(lowerCaseSearch)) ||
                user.email.toLowerCase().includes(lowerCaseSearch)
            ),
          });
        }
        return generateResponse({ users: usersData.users });
      }
      return getUnAuthorizedResponse();
    },
  },
  {
    url: '/api/users',
    method: 'post',
    timeout: 2000,
    response: ({ body, headers }: { body: any; headers: ApiHeaders }) => {
      if (!validateToken(headers.authorization)) {
        return getUnAuthorizedResponse();
      }

      // Add the new user to the mock data
      const newUser = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        ...body,
      };

      usersData.users.unshift(newUser); // Add the new user at the beginning
      console.log('Mock Server: New user added:', newUser);

      return generateResponse({ user: newUser });
    },
  },
  {
    url: '/api/users/:id',
    method: 'put',
    timeout: 2000,
    response: ({ headers, body, query }: { headers: ApiHeaders; body: any; query: any }) => {
      if (!validateToken(headers.authorization)) {
        return getUnAuthorizedResponse();
      }
  
      const userId = query.id;
      const index = usersData.users.findIndex((user: any) => user.id === userId);
  
      if (index === -1) {
        return generateResponse({ success: false, message: 'User not found' });
      }
  
      // Update the user's data
      usersData.users[index] = { ...usersData.users[index], ...body };
      console.log('Mock Server: User updated:', userId);
  
      return generateResponse({ success: true, message: 'User updated successfully' });
    },
  },
  {
    url: '/api/users/:id',
    method: 'delete',
    timeout: 2000,
    response: ({ headers, query }: { headers: ApiHeaders; query: any }) => {
      if (!validateToken(headers.authorization)) {
        return getUnAuthorizedResponse();
      }

      const userId = query.id;
      const index = usersData.users.findIndex((user: any) => user.id === userId);

      if (index === -1) {
        return generateResponse({ success: false, message: 'User not found' });
      }

      usersData.users.splice(index, 1); // Remove the user
      console.log('Mock Server: User deleted:', userId);

      return generateResponse({ success: true, message: 'User deleted successfully' });
    },
  },
];

export default mock;