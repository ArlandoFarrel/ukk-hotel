import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination'
import EditRoomModal from '@/components/EditRoomModal'
import DeleteRoomModal from '@/components/DeleteRoomModal'

let config = {}
let token = ""
const RoomList = () => {
  //PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Jumlah item per halaman (tidak dapat diubah)
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [kamars, setKamars] = useState([]);
  const [tglAksesSatu, setTglAksesSatu] = useState('');
  const [tglAksesDua, setTglAksesDua] = useState('');
  const [filteredKamars, setFilteredKamars] = useState([]);
  const [showAll, setShowAll] = useState(true);

  //PAGINATION
  const totalPages = Math.ceil(filteredKamars.length / itemsPerPage);

  useEffect(() => {
    token = window.sessionStorage.getItem("token")
    console.log(token);
    config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }, [])


  //PAGINATION

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const router = useRouter();

  useEffect(() => {
    getKamars();
  }, []);

  const getKamars = async () => {
    try {
      const response = await axios.get('http://localhost:8000/kamar/getAllKamar', config);
      setKamars(response.data.data);
      setFilteredKamars(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvailClick = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/kamar/getKamarAvaible',
        {
          tgl_akses_satu: tglAksesSatu,
          tgl_akses_dua: tglAksesDua
        },
        config
      );
      setFilteredKamars(response.data.data);
      setShowAll(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKamars.slice(indexOfFirstItem, indexOfLastItem);



  const handleShowAllClick = () => {
    setTglAksesSatu('');
    setTglAksesDua('');
    setFilteredKamars(kamars);
    setShowAll(true);
  };


  const handleDateChange = (e, field) => {
    const value = e.target.value;
    if (field === 'tglAksesSatu') {
      setTglAksesSatu(value);
    } else if (field === 'tglAksesDua') {
      setTglAksesDua(value);
    }
  };

  const addClick = () => {
    router.push('/addroom');
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedRoom(null);
  };

  const handleUpdateRoom = async (editedNomorKamar, editedNamaTipeKamar) => {
    try {
      const updatedRoom = {
        id: selectedRoom.id,
        nomor_kamar: editedNomorKamar,
        nama_tipe_kamar: editedNamaTipeKamar,
      };

      const response = await axios.put(`http://localhost:8000/kamar/${updatedRoom.id}`,config, updatedRoom);
      console.log(response.data); // Response dari server setelah berhasil memperbarui data

      setShowEditModal(false);
      setSelectedRoom(null);
      getKamars(); // Memperbarui daftar kamar setelah berhasil memperbarui data
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (room) => {
    setSelectedRoom(room);
    setShowEditModal(true);
  };

  const handleDeleteRoom = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };
  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedRoom(null);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/kamar/${selectedRoom.id}`, config);
      console.log('Room deleted successfully');

      setShowDeleteModal(false);
      setSelectedRoom(null);
      getKamars(); // Memperbarui daftar kamar setelah berhasil menghapus data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto justify-center mt-10 w-3/4 ">
      <button
        onClick={addClick}
        className="px-4 py-2 m-2 bg-green-500 text-white hover:bg-white hover:text-green-500 rounded-md ml-2"
      >
        Add
      </button>
      <button
        onClick={handleShowAllClick}
        className="px-4 py-2 m-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2"
        disabled={showAll}
      >
        Show All
      </button>
      <button
        onClick={handleAvailClick}
        className="px-4 py-2 m-2 bg-yellow-500 text-white hover:bg-white hover:text-yellow-500 rounded-md ml-2"
        disabled={!showAll}
      >
        Filter
      </button>


      {!showAll && (
        <div className="flex items-center">
          <label htmlFor="tglAksesSatu" className="mr-2">
            From:
          </label>
          <input
            type="date"
            id="tglAksesSatu"
            value={tglAksesSatu}
            onChange={(e) => handleDateChange(e, 'tglAksesSatu')}
            className="px-2 py-1 border rounded"
          />
          <label htmlFor="tglAksesDua" className="ml-2 mr-2">
            To:
          </label>
          <input
            type="date"
            id="tglAksesDua"
            value={tglAksesDua}
            onChange={(e) => handleDateChange(e, 'tglAksesDua')}
            className="px-2 py-1 border rounded"
          />
          <button
            onClick={handleAvailClick}
            className="px-4 py-2 m-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2"
          >
            Apply
          </button>
        </div>
      )}
      {showEditModal && (
        <EditRoomModal roomData={selectedRoom} handleUpdate={handleUpdateRoom} handleClose={handleCloseModal} />
      )}
      {showDeleteModal && (
  <DeleteRoomModal isOpen={showDeleteModal} closeModal={handleCloseModals} handleDelete={handleDelete} />
)}
      <div className="">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-center">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nomor Kamar
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Tipe Kamar
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.map((kamar) => (
              <tr key={kamar.id}>
                <td className="px-6 py-4">{kamar.nomor_kamar}</td>
                <td className="px-6 py-4">{kamar.nama_tipe_kamar}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2"
                    onClick={() => handleEditRoom(kamar)}
                  >
                    <BsPencil />
                  </button>
                  <button 
                  className="px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 rounded-md ml-2"
                  onClick={() => handleDeleteRoom(kamar)}>
                    <BsTrash />
                  </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      </div>

    </div>
  );
};

export default RoomList;
