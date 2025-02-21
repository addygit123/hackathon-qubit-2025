import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/firebase"; // Adjust the path to your firebase.js file

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Reference the 'users' collection in Firestore
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);

        // Map through the documents and extract user data
        const userList = usersSnapshot.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(), // Spread other fields from the document
        }));

        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">No users found in the database.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">User List</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="border-b py-2 last:border-none flex justify-between"
            >
              <span>
                <strong>Name:</strong> {user.name || "N/A"}
              </span>
              {/* <span>
                <strong>Email:</strong> {user. || "N/A"}
              </span> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
