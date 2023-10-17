import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
// import { useRouter} from 'next/router'
let config = {}
let token = ""
const AddUser = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    // const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState(null);

    const router = useRouter();
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
        router.push('/admin/typeroomlist');
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const saveType = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append('nama_tipe_kamar', name);
          formData.append('harga', price);
          formData.append('deskripsi', desc);
          formData.append('foto', photo);
        //   formData.append('role', role);
      
          await axios.post('http://localhost:8000/tipe/addTipe', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            },
          });
      
          router.push('/admin/typeroomlist');
        } catch (error) {
          console.log(error);
        }
      };
      

    return (
        <div>
        <div className="flex justify-center">
          <div className="w-3/4 mt-10 bg-blue-100 p-10 rounded-md">
            <form onSubmit={saveType}>
              {/* Form input fields */}
                  
              <div className="mb-4">
                <label htmlFor="nama_tipe_kamar" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Tipe Kamar
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="nama_tipe_kamar"
                  name="nama_tipe_kamar"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="harga" className="block text-sm font-medium text-gray-700 mb-1">
                  Harga
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  id="harga"
                  name="harga"
                  className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <input
                  type="text"
                  id="deskripsi"
                  name="deskripsi"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                />
              </div>
      
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
