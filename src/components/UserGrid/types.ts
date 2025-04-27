// src/components/UserGrid/types.ts

export interface ApiResponseUser {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    status: 'ACTIVE' | 'LOCKED';
    dateOfBirth: string;
  }
  
  export interface UserGridProps {
    users: ApiResponseUser[];
    fetchUsers: () => void;
  }