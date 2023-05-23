import React, { useState, useEffect } from 'react';
import { BsPencil } from 'react-icons/bs';
import Modal from 'react-modal';
import axios from 'axios';

let config = {}
let token = ""

const EditRoomModal = ({ roomData, handleUpdate, handleClose }) => {
  const [editedNomorKamar, setEditedNomorKamar] = useState('');
  const [editedNamaTipeKamar, setEditedNamaTipeKamar] = useState('');
  const [tipeKamarList, setTipeKamarList] = useState([]);
  useEffect(() => {
    token = window.sessionStorage.getItem("token")
    console.log(token);
    config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }, [])
  useEffect(() => {
    if (roomData) {
      setEditedNomorKamar(roomData.nomor_kamar);
      setEditedNamaTipeKamar(roomData.nama_tipe_kamar);
    }
    fetchTipeKamar();
  }, [roomData]);

  const closeModal = () => {
    handleClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdate(editedNomorKamar, editedNamaTipeKamar);
    closeModal();
  };

  const fetchTipeKamar = async () => {
    try {
      const response = await axios.get('http://localhost:8000/tipe/getAllTipe', config);
      setTipeKamarList(response.data.data);
    } catch (error) {
      console.error('Error fetching tipe kamar:', error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="Edit Room Modal"
        ariaHideApp={false}
      >
        <h2>Edit Room</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="nomorKamar" className='block text-gray-700 text-sm font-bold mb-2'>Nomor Kamar</label>
            <input
              type="text"
              id="nomorKamar"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={editedNomorKamar}
              onChange={(e) => setEditedNomorKamar(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namaTipeKamar">Nama Tipe Kamar</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
              id="nama_tipe_kamar"
              value={editedNamaTipeKamar}
              onChange={(e) => setEditedNamaTipeKamar(e.target.value)}
            >
              <option value="">Pilih Tipe Kamar</option>
              {tipeKamarList.map((tipeKamar) => (
                <option key={tipeKamar.id} value={tipeKamar.nama_tipe_kamar}>
                  {tipeKamar.nama_tipe_kamar}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end ">
            <button type="button" onClick={closeModal}  className="mx-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700">Close</button>
            <button type="submit"  className="mx-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">Update</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditRoomModal;
