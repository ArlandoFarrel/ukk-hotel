import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import withAuth from './withAuth';
import { AiOutlinePrinter } from 'react-icons/ai';

import OrderDetailsModal from '@/components/OrderDetailsModal';
import jsPDF from 'jspdf';
import {BsFillTicketDetailedFill} from 'react-icons/bs'
// import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const CustomerHistory = () => {
 
    const [transactions, setTransactions] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false)
    let config = {}
    let token = ''


    

    const openModals = (order) => {
        setSelectedOrder(order)
        setIsOpenModal(true)
    }
    const closeModals = () => {
        setSelectedOrder(null)
        setIsOpenModal(false)
    }
    useEffect(() => {
        token = window.sessionStorage.getItem("token");
        console.log(token);
        config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }, []);
    


    useEffect(() => {
        // const userId = window.sessionStorage.getItem('id'); // Get user ID from sessionStorage
        const userId = window.sessionStorage.getItem('id');
        const token = window.sessionStorage.getItem('token');
        axios.get(`http://localhost:8000/pemesanan/getPesanId/${userId}`,
            config,
        )

            .then((response) => {
                setTransactions(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
            });
    }, []); // Empty dependency array ensures this effect runs once after initial render

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('id-ID', options);
    };
    const generatePDF = () => {
        if (selectedOrder) {
            const pdf = new jsPDF();
            
            // Set font style, size, and color
            pdf.setFont('helvetica');
            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0); // Black color
    
            // Calculate text width to position it in the center
            const text = `Nomor Transaksi: ${selectedOrder.nomor_pemesanan}`;
            const textWidth = pdf.getStringUnitWidth(text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const startX = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
            pdf.text(`Tanggal Pemesanan: ${formatDate(selectedOrder.tgl_pemesanan)}`, 20, 30);
            pdf.text(`Nama Pemesan: ${selectedOrder.nama_pemesan}`, 20, 40);
            pdf.text(`Tanggal Check In: ${formatDate(selectedOrder.tgl_check_in)}`, 20, 50)
            pdf.text(`Tanggal Check Out: ${formatDate(selectedOrder.tgl_check_out)}`, 20, 60)
            pdf.text(`Tipe Kamar: ${selectedOrder.nama_tipe_kamar}`, 20, 70);
            pdf.text(`Jumlah Kamar: ${selectedOrder.jumlah_kamar}`, 20, 80);
            pdf.text(`Harga: ${parseFloat(selectedOrder.harga).toLocaleString('id-ID')}`, 20, 100);
            // Add text in the center
            pdf.text(text, startX, 20);
    
            // Add more text elements as needed, calculating width and positioning them in the center
    
            // Add colored rectangle
            // pdf.setFillColor(200, 220, 255); // Set fill color
            // pdf.rect(15, 15, 180, 30, 'F'); // Draw rectangle with fill
    
            pdf.save(`invoice_${selectedOrder.nomor_pemesanan}.pdf`);
        } else {
            console.error('Selected order is null.');
        }
    };
    
    
   

   
    return (
        <div className=''>
            <Navbar />
            <table className='bg-slate-900 text-slate-200 w-full text-center table-auto text-[12px] '>
                <thead className='border-b-2 border-slate-700'>
                    <tr>
                        <th className='py-2 w-1/6'>Nomor Transaksi</th>
                        <th className='py-2 w-auto'>Tanggal Pemesanan</th>
                        <th className='py-2 w-auto'>Nama Pemesan</th>
                        <th className='py-2 w-auto'>Tipe Kamar</th>
                        <th className='py-2 w-auto'>Status</th>
                        <th className='py-2 w-auto'>Harga</th>
                        <th className='py-2 w-auto'>Aksi</th>
                        {/* Add more table headers for additional transaction details if needed */}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className='hover:bg-slate-200 hover:text-slate-900  hover transition duration-300'>
                            <td className='py-2'>{transaction.nomor_pemesanan}</td>
                            <td className='py-2'>{formatDate(transaction.tgl_pemesanan)}</td>
                            <td className='py-2'>{transaction.nama_pemesan}</td>
                            <td className='py-2'>{transaction.nama_tipe_kamar}</td>
                            <td className='py-2'>{transaction.status_pemesanan}</td>
                            <td className='py-2'>Rp.{parseFloat(transaction.harga).toLocaleString('id-ID')}</td>
                            <td className='py-2'>
                                
                                <button className='px-2 py-2' onClick={() => openModals(transaction)} >
                                    <BsFillTicketDetailedFill className='text-xl'/>
                                </button>
                            </td>
                            {/* Add more table cells for additional transaction details if needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
            {isOpenModal && selectedOrder && (
                <OrderDetailsModal order={selectedOrder} onClose={closeModals} onDownloadPDF={generatePDF} />
            )}
        </div>
    );

};



export default CustomerHistory;
