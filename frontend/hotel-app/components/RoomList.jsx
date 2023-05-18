import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';

const RoomList = () => {
  const [kamars, setKamars] = useState([]);

  useEffect(() => {
    getKamars();
  }, []);

  const getKamars = async () => {
    try {
      const response = await axios.get('http://localhost:8000/kamar/getAllKamar');
      setKamars(response.data.data);
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
                Nomor Kamar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Tipe Kamar
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {kamars.map((kamar) => (
              <tr key={kamar.id}>
              
                <td className="px-6 py-4">{kamar.nomor_kamar}</td>
                <td className="px-6 py-4">{kamar.tipe_kamar.nama_tipe_kamar}</td>
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

export default RoomList;
