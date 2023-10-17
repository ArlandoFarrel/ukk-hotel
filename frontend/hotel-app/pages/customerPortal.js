import Navbar from "@/components/Navbar";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react"
import Modal from "react-modal";
import KamarDetailModal from "@/components/KamarDetailModal";
import withAuth from "./withAuth";
import { useRouter } from "next/router";
let config = {}
let token = ""
const CustomerPortal = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const todayFormatted = today.toISOString().substr(0, 10);
    const [tglAksesSatu, setTglAksesSatu] = useState(todayFormatted);
    const tomorrowFormatted = tomorrow.toISOString().substr(0, 10);
    const [endDate, setEndDate] = useState(tomorrowFormatted);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [availableRoomByType, setAvailableRoomByType] = useState({})
    const [selectedKamar, setSelectedKamar] = useState(null)
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [namaUser, setNamaUser] = useState()
    
    useEffect(() => {
        const item = sessionStorage.getItem("nama_user");
        if (item) {
          console.log(item);
          setNamaUser(item);
        }
      }, []);
    useEffect(() => {
        const roomsByType = availableRooms.reduce((accumulator, kamar) => {
            const { nama_tipe_kamar } = kamar;

            if (accumulator[nama_tipe_kamar]) {
                accumulator[nama_tipe_kamar].count += 1;
            } else {
                accumulator[nama_tipe_kamar] = {
                    count: 1,
                    kamar,
                };
            }

            return accumulator;
        }, {}); // Mulai dengan objek kosong sebagai nilai awal accumulator

        setAvailableRoomByType(roomsByType);
    }, [availableRooms]);
    useEffect(() => {
        
        const token = window.sessionStorage.getItem("token")
        console.log(token);
        setIsUserAuthenticated(!!token);
        config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }, [])
    
    const [formData, setFormData] = useState({
        tipe_kamar: '',
        nama_pemesan: '',
        email_pemesan: '',
        tgl_check_in: '',
        tgl_check_out: '',
        nama_tamu: '',
        jumlah_kamar: '',
        // status_pemesanan: '',
        nama_user: sessionStorage.getItem('nama_user'),
    });    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "tipe_kamar" && selectedRoomType) {
            setFormData({
                ...formData,
                [name]: selectedRoomType.nama_tipe_kamar,
            });
        } else {
            // For other fields, update the form data as usual
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    const router = useRouter();
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            // Lakukan validasi data jika diperlukan sebelum mengirim ke server

            // Kirim data ke server menggunakan metode POST
            const response = await axios.post('http://localhost:8000/pemesanan/addPemesanan',
                formData, // Kirim semua data formData ke server
                config // Sertakan konfigurasi headers (Authorization token) jika diperlukan
            );
            console.log('Data yang dikirim ke server:', formData);
            setFormData({
                tipe_kamar: '',
                nama_pemesan: '',
                email_pemesan: '',
                tgl_check_in: '',
                tgl_check_out: '',
                nama_tamu: '',
                jumlah_kamar: '',
                // status_pemesanan: '',
                nama_user: sessionStorage.getItem('nama_user'),
            })
            
            // Handle respons dari server sesuai kebutuhan, contoh:
            console.log('Respon dari server:', response.data);
            setModalOpen(false)
            // Lakukan navigasi ke halaman orderlist atau halaman lainnya jika diperlukan
            router.push('/customerPortal');

        } catch (error) {
            console.error('Kesalahan saat mengirim data:', error);
            console.log(formData)
            // Handle kesalahan sesuai kebutuhan aplikasi Anda
        }
    };

    const openModal = (kamar) => {
        setSelectedKamar(kamar);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedKamar(null);
        setIsModalOpen(false);
    };
    const handleStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const maximumEndDate = new Date(endDate);
        maximumEndDate.setDate(new Date(endDate).getDate() - 1); // Tidak memperbolehkan tanggal awal lebih besar dari tanggal akhir

        if (selectedDate <= maximumEndDate && selectedDate >= today) {
            setTglAksesSatu(e.target.value);
            console.log('Tanggal Akses Satu:', e.target.value);
        } else {
            console.log('Tanggal tidak valid.');
            alert('Tanggal awal minimal hari ini dan maksimal 1 hari sebelum Tanggal akhir')

        }
    };



    const handleEndDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const minimumDate = new Date(tglAksesSatu);
        minimumDate.setDate(new Date(tglAksesSatu).getDate() + 1); // Tidak memperbolehkan memilih tanggal sebelumnya
        if (selectedDate >= minimumDate) {
            setEndDate(e.target.value);
            console.log('Tanggal Akhir:', e.target.value);
        } else {
            console.log('Tanggal tidak valid.');
            alert('Setidaknya satu hari setelah tanggal pertama')
        }
    };

    const handleSubmit = async () => {

        try {
            const response = await axios.post(
                'http://localhost:8000/kamar/getKamarAvaible',
                {
                    tgl_akses_satu: tglAksesSatu,
                    tgl_akses_dua: endDate
                },

            );
            setAvailableRooms(response.data.data);
            setIsSubmitted(true)
            // setModalOpen(true)
        } catch (error) {
            console.error(error);
        }
    };
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handlePesanKamar = (kamar) => {
        if (isUserAuthenticated) {
            setSelectedRoomType(kamar); // Set the selectedRoomType here
            setModalOpen(true); // Open the modal
            setFormData(prevData => ({
                ...prevData,
                tipe_kamar: kamar.nama_tipe_kamar, // Set the tipe_kamar field based on the selected room type
            }));
        } else {
            // If the user is not authenticated, show a message or redirect to the login page.
            alert('Harap login terlebih dahulu untuk memesan kamar');
            // Alternatively, you can redirect the user to the login page:
            // history.push('/login');
        }
    };

    return (
        <div className="">

            <Navbar />
            <div className="h-[calc(100vh-64px)]">
                {/* "100vh" adalah tinggi viewport, "64px" adalah tinggi navbar */}
                <Image
                    src="/img/admin.jpg"
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    style={{ zIndex: -1 }} // Mengatur z-index untuk memastikan gambar di lapisan yang lebih rendah
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center max-w-[50vw] max-h-[45vh] mx-auto my-auto bg-gradient-to-r from-slate-900 to-cyan-900 rounded-lg">
                    <div className="text-white text-4xl font-bold mb-8">Cek Ketersediaan Kamar</div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                        <input
                            type="date"
                            id="startDate"
                            className="border rounded p-2"
                            value={tglAksesSatu}
                            onChange={handleStartDateChange}
                            required
                        />
                        <span className="text-gray-500">to</span>
                        <input
                            type="date"
                            id="endDate"
                            className="border rounded p-2"
                            value={endDate}
                            onChange={handleEndDateChange}
                            required
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-teal-950 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
                        >
                            Cari
                        </button>
                    </div>
                </div>
            </div>
            {isSubmitted && (
                <div className="bg-slate-200 p-6">
                    {isSubmitted && (
                        <div className="flex items-center text-2xl font-bold text-slate-900 ">
                            <h2>Kamar yang Tersedia:</h2>
                        </div>
                    )}
                    <div className="flex items-center ">
                        <ul className=" w-full grid grid-cols-2 gap-4  py-2">

                            {isSubmitted &&
                                Object.entries(availableRoomByType).map(([tipeKamar, data], index) => (
                                    <li key={index} className=" p-4 bg-slate-900 flex gap-2 shadow-lg hover:shadow-2xl rounded ">
                                        {data.kamar.foto && (
                                            <img
                                                src={`http://localhost:8000/cover/${data.kamar.foto}`}
                                                alt="Foto Pengguna"
                                                className="w-60 h-40  rounded overflow-hidden object-cover"
                                            />
                                        )}
                                        <div className="text-slate-200">

                                            <p className="my-2 font-semibold">{tipeKamar}</p>
                                            <p className="my-2 text-lg font-semibold">Rp.{parseFloat(data.kamar.harga).toLocaleString('id-ID')}</p>
                                            <p className="my-2 text-lg font-semibold">Jumlah tersedia: {data.count}</p>

                                            <button
                                                onClick={() => handlePesanKamar(data.kamar)}
                                                className="bg-slate-200 hover:bg-slate-900 text-slate-900 hover:text-slate-200 px-4 py-2 rounded transition duration-300 ease-in-out"
                                            >
                                                Pesan Kamar
                                            </button>

                                            <button
                                                onClick={() => openModal(data.kamar)}
                                                // Tentukan fungsi untuk menangani pemesanan di sini
                                                className="bg-slate-200 hover:bg-slate-900 text-slate-900 hover:text-slate-200 mx-4 px-4 py-2 rounded transition duration-300 ease-in-out"
                                            >
                                                Detail
                                            </button>
                                        </div>

                                    </li>
                                ))}
                        </ul>
                        <KamarDetailModal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            kamar={selectedKamar} />

                        {isUserAuthenticated && (
                            <Modal
                                isOpen={modalOpen}
                                onRequestClose={() => setModalOpen(false)}
                                className='absolute inset-0 overflow-y-auto p-6 bg-slate-900 w-1/2 max-h-[70vh] rounded-2xl mx-auto my-auto'
                            >
                                {selectedRoomType && (
                                    <div className=" text-slate-200 overflow-y-auto" >

                                        <form onSubmit={handleAdd} className="p-2">
                                            <div className="mb-2">
                                                <label className="block text-gray-700 text-xs font-semibold mb-1">Nama Tipe Kamar:</label>
                                                <input
                                                    type="text"
                                                    required
                                                    name="tipe_kamar"
                                                    value={selectedRoomType ? selectedRoomType.nama_tipe_kamar : ''}
                                                    onChange={handleChange}
                                                    className="border border-gray-300 rounded-md p-2 w-3/4 text-sm text-gray-900"
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <label className="block text-gray-700 text-xs font-semibold mb-1">Nama Pemesan:</label>
                                                <input
                                                    type="text"
                                                    required
                                                    name="nama_pemesan"
                                                    value={formData.nama_pemesan}
                                                    onChange={handleChange}
                                                    className="border border-gray-300 rounded-md p-2 w-3/4 text-sm text-gray-900"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Email Pemesan:
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email_pemesan"
                                                    required
                                                    value={formData.email_pemesan}
                                                    onChange={handleChange}
                                                    className="border border-gray-300 rounded-md px-3 py-2 w-3/4 text-gray-900"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Tanggal Check In:
                                                </label>
                                                <input
                                                    type="date"
                                                    required
                                                    name="tgl_check_in"
                                                    value={formData.tgl_check_in}
                                                    onChange={handleChange}
                                                    className="border border-gray-300 rounded-md px-3 py-2 w-3/4 text-gray-900"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Tanggal Check Out:
                                                </label>
                                                <input
                                                    type="date"
                                                    name="tgl_check_out"
                                                    value={formData.tgl_check_out}
                                                    onChange={handleChange}
                                                    required
                                                    className="border border-gray-300 rounded-md px-3 py-2 w-3/4 text-gray-900"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Nama Tamu:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nama_tamu"
                                                    value={formData.nama_tamu}
                                                    onChange={handleChange}
                                                    required
                                                    className="border border-gray-300 rounded-md px-3 py-2 w-3/4 text-gray-900"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Jumlah Kamar:
                                                </label>
                                                <input
                                                    type="number"
                                                    name="jumlah_kamar"
                                                    value={formData.jumlah_kamar}
                                                    required
                                                    onChange={handleChange}
                                                    className="border border-gray-300 rounded-md px-3 py-2 w-3/4 text-gray-900"
                                                />
                                            </div>



                                            <div className="mb-4">
                                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                                    Nama User:
                                                </label>
                                                <input
                                                    type="text"
                                                    name="nama_user"
                                                    value={namaUser}
                                                    onChange={handleChange}
                                                    required
                                                    className="rounded-md px-3 py-2 w-3/4 text-gray-900"
                                                />
                                            </div>

                                            <div className="flex items-center mt-8">
                                                <button
                                                    type="button"
                                                    className="px-2 py-2 text-sm bg-gray-300 text-gray-700 rounded-md mr-2"
                                                    onClick={() => setModalOpen(false)} 
                                                >
                                                    Back
                                                </button>
                                                <button type="submit" className="text-sm px-2 py-2 bg-green-500 text-white rounded-md">
                                                    Add
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                )}
                            </Modal>
                        )}

                    </div>
                </div>
            )
            }
        </div >
    );
};

export default CustomerPortal;
