// components/UserGrid.tsx
import UserCard from "./UserCard";

type User = {
  name: string;
  email: string;
  status: "active" | "locked";
  dob: string;
};

const users: User[] = [
  {
    name: "Fawzy Ghazawy",
    email: "fawzy@example.com",
    status: "active",
    dob: "1999-09-15",
  },
  {
    name: "Antonella Doumit",
    email: "anto@example.com",
    status: "locked",
    dob: "1998-11-22",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "locked",
    dob: "1988-10-22",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    dob: "1990-05-15",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    status: "active",
    dob: "1995-02-10",
  },
  {
    name: "David Lee",
    email: "david.lee@example.com",
    status: "locked",
    dob: "1987-07-14",
  },
];

const UserGrid = () => {
  return (
<div className="w-full px-6 py-4">
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {users.map((user, idx) => (
      <UserCard key={idx} user={user} />
    ))}
  </div>
</div>

  );
};

export default UserGrid;
