import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPencil, BsTrash } from "react-icons/bs";
import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/router";
import Modal from "react-modal";
let config = {};
let token = "";
const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State variable for selected order
  const [showModal, setShowModal] = useState(false); // State variable for modal visibility
  const router = useRouter();
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    token = window.sessionStorage.getItem("token");
    console.log(token);
    config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/pemesanan/getAllPemesanan",
        config
      );
      setOrder(response.data.data);
      setFilteredOrders(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const editOrder = (orderId) => {
    const selected = order.find((order) => order.id === orderId);
    setSelectedOrder(selected);
    setShowModal(true);
  };

  const formatDate = (date) => {
    const formattedDate = format(new Date(date), "dd MMM yyyy");
    const formattedTime = format(new Date(date), "HH:mm");
    return `${formattedDate} ${formattedTime}`;
  };

  const addClick = () => {
    router.push("/addorder");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      status_pemesanan: selectedOrder.status_pemesanan,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/pemesanan/updateStatusPemesanan/${selectedOrder.id}`,
        updatedOrder,
        config
      );

      setShowModal(false);
      getOrder();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Filter orders based on search query when it changes
    const filtered = order.filter((orders) =>
      orders.nama_tamu.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery, order]);
  
  const handleChange = (e) => {
    setSelectedOrder({ ...selectedOrder, status_pemesanan: e.target.value });
  };

  const renderModal = () => {
    if (!selectedOrder) return null;

    const filteredOrders = order.filter((orders) => {
      return orders.nama_tamu.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
      <Modal isOpen={showModal}>
        <h2>Update Order</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Add your form fields here and populate them with selectedOrder data */}
          {/* Example: */}
          <label
            htmlFor="status_pemesanan"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nama Pemesan
          </label>
          {/* <input type="text" name="status_pemesanan" value={selectedOrder.status_pemesanan}  className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900" /> */}

          <select
            name="status_pemesanan"
            onChange={handleChange}
            value={selectedOrder.status_pemesanan}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
          >
            <option value="baru">Baru</option>
            <option value="check_in">Check In</option>
            <option value="check_out">Check Out</option>
          </select>
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="mx-2 my-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Close
          </button>
          <button
            type="submit"
            className="mx-2 my-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update
          </button>
          {/* <button type="submit">Update</button> */}
        </form>
        {/* <button onClick={() => setShowModal(false)}>Cancel</button> */}
      </Modal>
    );
  };

  return (
    <div className="mx-auto justify-center mt-10 w-3/4 ">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari berdasarkan nama tamu"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
        />
      </div>
      <button
        onClick={addClick}
        className="px-4 py-2 m-2 bg-green-500 text-white hover:bg-white hover:text-green-500 rounded-md ml-2"
      >
        Add
      </button>
      {renderModal()}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-center">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nama Tamu
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Tanggal Check In
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Tanggal Check Out
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
            {filteredOrders.map((orders) => (
              <tr key={orders.id}>
                <td className="px-6 py-4">{orders.nama_tamu}</td>
                {/* <td className="px-6 py-4">{orders.nama_pemesan}</td> */}
                <td className="px-6 py-4">{formatDate(orders.tgl_check_in)}</td>
                <td className="px-6 py-4">
                  {formatDate(orders.tgl_check_out)}
                </td>

                <td className="px-6 py-4">{orders.jumlah_kamar}</td>
                <td className="px-6 py-4">{orders.status_pemesanan}</td>
                {/* <td className="px-6 py-4">{orders.nama_iser}</td> */}
                <td className="px-6 py-4">{orders.nama_user}</td>
                <td className="px-6 py-4">{orders.nama_tipe_kamar}</td>
                <td className="px-6 py-4">{orders.nomor_kamar}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2 my-2"
                    onClick={() => editOrder(orders.id)}
                  >
                    <BsPencil />
                  </button>
                  {/* <button className="px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 rounded-md ml-2">
                    <BsTrash />
                  </button> */}
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
