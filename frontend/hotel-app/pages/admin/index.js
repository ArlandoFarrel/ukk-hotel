import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import  Sidebar from '@/components/Sidebar';
import withAuth from '../withAuth';

let config = {}
let token = ""
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('admin');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  

  const router = useRouter();
//   const peranPengguna = 'admin';


// if (peranPengguna !== 'admin') {
  
//   router.push('/login'); // Redirect 
//   return null; // Tidak merender apa-apa atau tampilkan spinner loading
// }

  useEffect(() => {
    token = window.sessionStorage.getItem("token")
    console.log(token);
    config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }, [])

  const handleClick = () => {
    router.push('/');
  };

  const addClick = () => {
    router.push('/adduser')
  }
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    // Memeriksa apakah email kosong atau tidak valid
    if (!email || !email.trim()) {
      alert('Email cannot be empty.');
      return;
    }
    // Memeriksa apakah email yang ingin diubah sudah ada di daftar pengguna lainnya
    const existingUser = users.find((user) => user.email === email && user.id !== selectedUser);
    if (existingUser) {
      alert('Email is already in use. Please choose a different email.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('nama_user', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
  
      await axios.put(`http://localhost:8000/user/${selectedUser}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
  
      getUsers();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };
  



  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const user = users.find((user) => user.id === selectedUser);
      if (user) {
        setName(user.nama_user || '');
        setEmail(user.email || '');
        setRole(user.role || 'admin');
        setPassword(user.password || '');
        // setPhoto(user.foto || '');
      }
    }
  }, [selectedUser]);


  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/getAllUser', config);
      const { data } = response.data;

      // Filter the users based on the search query
      const filteredUsers = data.filter(user => user.nama_user.toLowerCase().includes(searchQuery.toLowerCase()));

      setUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = () => {
    getUsers();
  };


  const handleEditUser = (userId) => {
    setSelectedUser(userId);
    setModalIsOpen(true);
  };
  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setConfirmDeleteModalIsOpen(true);
  };
  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/user/${deleteUserId}`, config);
      getUsers(); // Ambil ulang daftar pengguna setelah penghapusan berhasil
      closeConfirmDeleteModal(); // Tutup pop-up konfirmasi
    } catch (error) {
      console.log(error);
    }
  };
  const closeConfirmDeleteModal = () => {
    setDeleteUserId(null);
    setConfirmDeleteModalIsOpen(false);
  };


  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  return (
    <div className='flex'>
      <div className='w-3/12'>
      <Sidebar />
      </div>
      <div className="  justify-center mt-10 w-8/12 ">

        <button onClick={addClick} className="px-4 py-2 m-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2">
          Add
        </button>
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-64"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2"
          >
            Search
          </button>
        </div>
        <div className=" mx-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-center">
            <thead className='text-center'>
              <tr>
                <th className="px-8py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                  Foto
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                  Nama
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
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
                        className="w-10 h-10 rounded-full overflow-hidden object-cover"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{user.nama_user}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role || '-'}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2"
                      onClick={() => handleEditUser(user.id)}




                    >
                      <BsPencil />
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 rounded-md ml-2"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <BsTrash />
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {confirmDeleteModalIsOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md">
              <h2>Delete User</h2>
              <p>Are you sure you want to delete this user?</p>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                  onClick={closeConfirmDeleteModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                  onClick={confirmDeleteUser}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal */}
        {selectedUser && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
              {/* Add your modal content here */}
              <h2>Edit User</h2>
              <form onSubmit={updateUser}>
                {/* Form input fields */}
                {/* <div className="mb-4">
                <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-1">
                  Foto
                </label>
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div> */}

                <div className="mb-4">
                  <label htmlFor="nama_user" className="block text-sm font-medium text-gray-700 mb-1">
                    Nama User
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="nama_user"
                    name="nama_user"

                    className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                  />

                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    name="role"
                    className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                  >
                    <option value="admin">Admin</option>
                    <option value="resepsionis">Resepsionis</option>
                  </select>
                </div>


                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                    onClick={closeModal}
                  >
                    Back
                  </button>
                  <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                    Update
                  </button>

                </div>
              </form>


            </div>
          </div>
        )}
      </div>
    </div>
  );

};

export default withAuth(Dashboard, ['admin']);
