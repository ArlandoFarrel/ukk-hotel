import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import { format } from 'date-fns';
let config={}
let token=""
const UserList = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(()=>{
    token=window.sessionStorage.getItem("token")
    console.log(token);
    config= {
     headers:{
       Authorization: `Bearer ${token}`
     }
    }
   },[])


  const getOrder = async () => {
    try {
      const response = await axios.get('http://localhost:8000/pemesanan/getAllPemesanan', config);
      setOrder(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    const formattedDate = format(new Date(date), 'dd MMM yyyy');
    const formattedTime = format(new Date(date), 'HH:mm');
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="flex justify-center mt-10">
      <Link href="./AddUser">Add</Link>
      <div className="w-3/4 overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-center">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nama Pemesan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Email Pemesan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Tanggal Pemesanan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Tanggal Check In
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Tanggal Check Out
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nama Tamu
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Jumlah Kamar
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Status Pemesanan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nama User
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nama Tipe Kamar
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nomor Kamar
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {order.map((orders) => (
              <tr key={orders.id}>
                <td className="px-6 py-4">{orders.nama_pemesan}</td>
                <td className="px-6 py-4">{orders.email_pemesan}</td>
                <td className="px-6 py-4">{formatDate(orders.tgl_pemesanan)}</td>
                <td className="px-6 py-4">{formatDate(orders.tgl_check_in)}</td>
                <td className="px-6 py-4">{formatDate(orders.tgl_check_out)}</td>
                <td className="px-6 py-4">{orders.nama_tamu}</td>
                <td className="px-6 py-4">{orders.jumlah_kamar}</td>
                <td className="px-6 py-4">{orders.status_pemesanan}</td>
                {/* <td className="px-6 py-4">{orders.nama_iser}</td> */}
                <td className="px-6 py-4">{orders.nama_user}</td>
                <td className="px-6 py-4">{orders.nama_tipe_kamar}</td>
                <td className="px-6 py-4">{orders.nomor_kamar}</td>
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
