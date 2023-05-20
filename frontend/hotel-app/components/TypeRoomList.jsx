import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

let config = {};
let token = '';

const UserList = () => {
  const [tipe, setTipe] = useState([]);
  const [deleteTypeId, setDeleteTypeId] = useState(null);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [nama, setNama] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState(null)
  const [photo, setPhoto] = useState(null);

  const router = useRouter();

  useEffect(() => {
    token = window.sessionStorage.getItem('token');
    console.log(token);
    config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }, []);

  useEffect(() => {
    getTypes();
  }, []);

  const getTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tipe/getAllTipe', config);
      setTipe(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-US');
  };

  const addClick = () => {
    router.push('/typeroomlist');
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNama(user.nama_tipe_kamar);
    setPrice(user.harga);
    setDesc(user.deskripsi);
    setPreviewPhoto(user.foto)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nama_tipe_kamar', nama);
      formData.append('harga', price);
      formData.append('deskripsi', desc);
      if (photo) {
        formData.append('foto', photo);
      }

      // Kirim permintaan update ke API
      const response = await axios.put(
        `http://localhost:8000/tipe/${selectedUser.id}`,
        formData,
        config
      );

      // Cek respon dari API
      if (response.status === 200) {
        // Berhasil diupdate, lakukan tindakan yang diperlukan
        closeModal();
        getTypes();
      } else {
        // Gagal diupdate, tangani kesalahan jika perlu
        console.error('Update failed');
      }
    } catch (error) {
      // Tangani kesalahan jika terjadi
      console.error(error);
    }
  };


  const handleDeleteType = (typeId) => {
    setDeleteTypeId(typeId);
    setConfirmDeleteModalIsOpen(true);
  };
  const confirmDeleteType = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/tipe/${deleteTypeId}`, config);
      if (response.status === 200) {
        getTypes();
        closeConfirmDeleteModal();
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeConfirmDeleteModal = () => {
    setDeleteTypeId(null);
    setConfirmDeleteModalIsOpen(false);
  };


  return (
    <div className="mx-auto justify-center mt-10 w-3/4 border">
      <button
        onClick={addClick}
        className="px-4 py-2 m-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2"
      >
        Add
      </button>
      <div className="">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-center">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Foto
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Nama Tipe Kamar
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Harga
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Deskripsi
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase bg-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tipe.map((tipes) => (
              <tr key={tipes.id}>
                <td className="px-6 py-4">
                  {tipes.foto && (
                    <img
                      src={`http://localhost:8000/cover/${tipes.foto}`}
                      alt="Foto Pengguna"
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                </td>
                <td className="px-6 py-4">{tipes.nama_tipe_kamar}</td>
                <td className="px-6 py-4">Rp.{formatPrice(tipes.harga)}</td>
                <td className="px-6 py-4">{tipes.deskripsi}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => openModal(tipes)}
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-white hover:text-blue-500 rounded-md ml-2"
                  >
                    <BsPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteType(tipes.id)}
                    className="px-4 py-2 bg-red-500 text-white hover:bg-white hover:text-red-500 rounded-md ml-2"
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
      <h2>Delete Type</h2>
      <p>Are you sure you want to delete this type of room?</p>
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
          onClick={confirmDeleteType}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


      <Modal isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}>
        {selectedUser && (
          <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nama Tipe:
              </label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Harga:
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Deskripsi:
              </label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Photo:
              </label>
              {previewPhoto && (
                <img
                  src={`http://localhost:8000/cover/${previewPhoto}`}
                  alt="Preview"
                  className="w-40 h-40 mb-2 rounded-md"
                />
              )}
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="border border-gray-300 rounded-md p-2 w-full"
              />

            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default UserList;
