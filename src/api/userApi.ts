// src/api/userApi.ts
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import api from './axiosInstance';

const queryClient = new QueryClient();

// Fetch users with optional search parameter
export const useGetUsers = (searchQuery = '') => {
  return useQuery({
    queryKey: ['users', searchQuery],
    queryFn: async () => {
      const response = await api.get('/api/users', { params: { search: searchQuery } });
      return response.data.data.users;
    },
  });
};

// Create a new user
export const useCreateUser = () => {
  return useMutation<
    any, // Response type
    Error, // Error type
    any // Variables type
  >({
    mutationFn: async (userData: any) => {
      const response = await api.post('/api/users', userData);
      return response.data.data.user;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'], // Specify the query key
          exact: true, // Invalidate only exact matches
        });
      },
  });
};

// Update a user
export const useUpdateUser = () => {
  return useMutation<
    any, // Response type
    Error, // Error type
    { id: string; userData: any } // Variables type
  >({
    mutationFn: async ({ id, userData }: { id: string; userData: any }) => {
      const response = await api.put(`/api/users/${id}`, userData);
      return response.data.data.user;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'], // Specify the query key
          exact: true, // Invalidate only exact matches
        });
      },
  });
};

// Delete a user
export const useDeleteUser = () => {
  return useMutation<
    void, // Response type (no response expected)
    Error, // Error type
    string // Variables type (user ID)
  >({
    mutationFn: async (id: string) => {
      await api.delete(`/api/users/${id}`);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['users'], // Specify the query key
          exact: true, // Invalidate only exact matches
        });
      },
  });
};