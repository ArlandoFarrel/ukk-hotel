import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next"); 

const KamarDetailModal = ({ isOpen, onRequestClose, kamar }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Kamar Details"
      className="custom-modal bg-slate-200 p-6 rounded-md shadow-lg w-1/2 border-2 mx-auto mt-20 "
    >
      {kamar && (
        <div className="flex gap-2">
          <div>
            {kamar.foto && (
              <img
                src={`http://localhost:8000/cover/${kamar.foto}`}
                alt="Foto Pengguna"
                className="w-60 h-40  rounded overflow-hidden object-cover"
              />
            )}
            <h2 className="text-xl font-semibold mb-4">
              Detail Kamar {kamar.nomor_kamar}{" "}
            </h2>
            <p className="mb-2">{kamar.nama_tipe_kamar} Room</p>
            <p className="mb-2">
               Rp.{parseFloat(kamar.harga).toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <p className="mb-2 font-semibold">Deskripsi</p>
            <div>{kamar.deskripsi}</div>
          </div>
        </div>
      )}
      <button
        onClick={onRequestClose}
        className="bg-slate-900  text-slate-200 py-2 px-4 mt-4 rounded-md transition duration-300"
      >
        Tutup
      </button>
    </Modal>
  );
};

export default KamarDetailModal;
