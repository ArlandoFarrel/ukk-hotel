import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/getAllUser');
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mt-10">
        <Link href="./AddUser">Add</Link>
      <div className="w-3/4">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Foto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4">
                  {user.foto && (
                    <img
                      src={`http://localhost:8000/cover/${user.foto}`}
                      alt="Foto Pengguna"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </td>
                <td className="px-6 py-4">{user.nama_user}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role || '-'}</td>
                <td className="px-6 py-4 space-x-2">
                  <button className="px-4 py-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2">
                    <BsPencil />
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 rounded-md ml-2">
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
