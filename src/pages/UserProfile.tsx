// src/pages/UserProfile.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p>User ID: {id}</p>
    </div>
  );
};

export default UserProfile;