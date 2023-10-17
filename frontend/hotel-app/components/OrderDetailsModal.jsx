import React from 'react';
import Modal from 'react-modal';
import { AiOutlinePrinter } from 'react-icons/ai';

// Modal.setAppElement('#root'); // Set the root element for accessibility

const OrderDetailsModal = ({ order, onClose, onDownloadPDF }) => {
    const formatPrice = (price) => {
        return `Rp.${parseFloat(price).toLocaleString('id-ID')}`;
      };
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
      };
      const displayRoomNumbers = order.kamars && order.kamars.map((kamar) => kamar.nomor_kamar).join(', ');


  return (
    <Modal
      isOpen={true} // Control the modal visibility with a prop, for example, isOpen={isOpen}
      onRequestClose={onClose} // Function to close the modal, usually sets the isOpen state to false
    //   style={customStyles}
    className='absolute inset-0 overflow-y-auto p-6 bg-slate-200 w-1/2 max-h-[70vh] rounded-xl mx-auto my-auto'
    >
      {/* Your modal content here */}
      <h2 className='text-2xl font-semibold mb-4'>Order Details</h2>
      <p className="mb-2"><span className="font-semibold">Transaction ID:</span> {order.nomor_pemesanan}</p>
      <p className="mb-2"><span className="font-semibold">Nama Pemesan:</span> {order.nama_pemesan}</p>
      <p className="mb-2"><span className="font-semibold">Email Pemesan:</span> {order.email_pemesan}</p>
      <p className="mb-2"><span className="font-semibold">Tanggal Pemesanan:</span> {formatDate(order.tgl_pemesanan)}</p>
      <p className="mb-2"><span className="font-semibold">Nama Tamu:</span> {order.nama_tamu}</p>
      <p className="mb-2"><span className="font-semibold">Tanggal Check In:</span> {formatDate(order.tgl_check_in)}</p>
      <p className="mb-2"><span className="font-semibold">Tanggal Check Out:</span> {formatDate(order.tgl_check_out)}</p>
      <p className="mb-2"><span className="font-semibold">Tipe Kamar:</span> {order.nama_tipe_kamar}</p>
      <p className="mb-2"><span className="font-semibold">Jumlah Kamar:</span> {order.jumlah_kamar}</p>
      <div className="mb-2">
        <span className="font-semibold">Nomor Kamar:</span> {order.nomor_kamar}
      </div>
      <p className="mb-2"><span className="font-semibold">Status Pemesanan:</span> {order.status_pemesanan}</p>
      <p className="mb-2"><span className="font-semibold">Biaya:</span> Rp.{parseFloat(order.harga).toLocaleString('id-ID')}</p>
      <div className="mt-4 flex justify-end">
      <button onClick={onDownloadPDF} className='hover:bg-slate-900 p-2 rounded hover:text-slate-200'><AiOutlinePrinter className='text-2xl hover:text-slate-200' /></button>
      </div>
      <div className="mt-4 flex justify-end">
      
   
        <button
          onClick={onClose}
          className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition duration-300"
        >
          Close Modal
        </button>
      </div>
    </Modal>
  );
};
export default OrderDetailsModal;
