import React from 'react';

interface ErrorDisplayProps {
  error: { message: string; statusCode: number } | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-500 text-white p-4 rounded mb-4">
      <p>{error.message}</p>
      <p>Status Code: {error.statusCode}</p>
    </div>
  );
};

export default ErrorDisplay;