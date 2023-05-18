import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);

    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const saveUser = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('nama_user', name);
          formData.append('email', email);
          formData.append('foto', photo);
          formData.append('password', password);
          formData.append('role', role);
      
          await axios.post('http://localhost:8000/user/addUser', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          router.push('/');
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <div>
        <div className="flex justify-center">
          <div className="w-3/4 mt-10 bg-blue-100 p-10 rounded-md">
            <form onSubmit={saveUser}>
              {/* Form input fields */}
              <div className="mb-4">
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
              </div>
      
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
                  onClick={handleClick}
                >
                  Back
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    );
};

export default AddUser;
