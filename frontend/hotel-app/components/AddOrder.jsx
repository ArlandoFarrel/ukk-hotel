// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from "next/router"
// import { getOrder } from './OrderList';
// let config = {}
// let token = ""
// const AddOrder = () => {
//     const [formData, setFormData] = useState({
//       nama_tipe_kamar: '',
//       nama_pemesan: '',
//       email_pemesan: '',
//       tgl_check_in: '',
//       tgl_check_out: '',
//       nama_tamu: '',
//       jumlah_kamar: '',
//       status_pemesanan: '',
//       nama_user: '',
//     });
  
//     useEffect(()=>{
//         token=window.sessionStorage.getItem("token")
//         console.log(token);
//         config= {   
//          headers:{
//            Authorization: `Bearer ${token}`
//          }
//         }
//        },[])
//     const router = useRouter()
//     const [userOptions, setUserOptions] = useState([]);
//     const [kamarOptions, setKamarOptions] = useState([]);

//     useEffect(() => {
//         fetchUserOptions();
//         fetchKamarOptions();
//     }, []);

//     const fetchUserOptions = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/user/getAllUser', config);
//             const users = response.data.data;
//             const options = users.map((user) => ({
//                 value: user.id_user,
//                 label: user.nama_user,
//             }));
//             setUserOptions(options);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchKamarOptions = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/kamar/getAllKamar', config);
//             const kamars = response.data.data;
//             const options = kamars.map((kamar) => ({
//                 value: kamar.nomor_kamar,
//                 label: kamar.nomor_kamar,
//             }));
//             setKamarOptions(options);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const calculateTotalHarga = async (nomor_kamar, tgl_check_in, tgl_check_out, jumlah_kamar) => {
//         try {
//           // Fetch room details based on nomor_kamar (make an API call if needed)
//           const roomDetails = await fetchRoomDetails(nomor_kamar);
    
//           // Calculate total price based on room details, check-in, check-out, and number of rooms
//           const totalHarga = calculatePrice(roomDetails, tgl_check_in, tgl_check_out, jumlah_kamar);
    
//           return totalHarga;
//         } catch (error) {
//           console.error(error);
//           return 0; // Handle error case appropriately
//         }
//       };
    
//       const fetchRoomDetails = async (nomor_kamar) => {
//         // Implement your logic to fetch room details from the backend using nomor_kamar
//         // Return room details as needed for price calculation
//       };
    
//       const calculatePrice = (roomDetails, tgl_check_in, tgl_check_out, jumlah_kamar) => {
//         // Implement your logic to calculate the total price based on roomDetails, check-in, check-out, and number of rooms
//         // Return the calculated total price
//       };

//       const handleChange = (e) => {
//         const { name, value } = e.target;
    
//         if (name === 'nomor_kamar' || name === 'tgl_check_in' || name === 'tgl_check_out' || name === 'jumlah_kamar') {
//           // Handle dynamic calculations for total harga here
//           // For example, when nomor_kamar, tgl_check_in, tgl_check_out, or jumlah_kamar changes, update total harga
//           // Use calculateTotalHarga function to calculate total harga based on the updated values
//           const totalHarga = calculateTotalHarga(formData.nomor_kamar, formData.tgl_check_in, formData.tgl_check_out, formData.jumlah_kamar);
//           setFormData({ ...formData, [name]: value, totalHarga: totalHarga });
//         } else {
//           setFormData({ ...formData, [name]: value });
//         }
//       };
    

   
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Hitung total harga berdasarkan input pengguna, Anda dapat menggunakan logika penghitungan sesuai kebutuhan aplikasi Anda
//       const totalHarga = calculateTotalHarga(formData.nomor_kamar, formData.tgl_check_in, formData.tgl_check_out, formData.jumlah_kamar);

//       // Data yang akan dikirimkan ke server
//       const requestData = {
//         nama_tipe_kamar: formData.nama_tipe_kamar,
//         nama_pemesan: formData.nama_pemesan,
//         email_pemesan: formData.email_pemesan,
//         tgl_check_in: formData.tgl_check_in,
//         tgl_check_out: formData.tgl_check_out,
//         nama_tamu: formData.nama_tamu,
//         jumlah_kamar: formData.jumlah_kamar,
//         nomor_kamar: formData.nomor_kamar,
//         status_pemesanan: formData.status_pemesanan,
//         nama_user: formData.nama_user,
//         total_harga: totalHarga // Mengirim total harga ke server jika diperlukan
//       };

//       // Kirim data ke server menggunakan metode POST
//       const response = await axios.post(
//         'http://localhost:8000/pemesanan/addPemesanan',
//         requestData,
//         config
//       );

//       // Handle respons dari server sesuai kebutuhan, contoh:
//       console.log('Respon dari server:', response.data);
//       // Lakukan navigasi ke halaman orderlist atau halaman lainnya jika diperlukan
//       router.push('/orderlist');
//     } catch (error) {
//       console.error('Kesalahan saat mengirim data:', error);
//       // Handle kesalahan sesuai kebutuhan aplikasi Anda
//     }
//   };

      
//     const handleClick = () => {
//         router.push('/orderlist');
//     };

//     return (
//         <div className='flex justify-center'>

//             <div className='w-3/4 mt-10 bg-blue-100 p-10 rounded-md'>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Nama Tipe Kamar:
//                     <input
//                         type="text"
//                         name="nama_tipe_kamar"
//                         value={formData.nama_tipe_kamar}
//                         onChange={handleChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Nama Pemesan:
//                     <input
//                         type="text"
//                         name="nama_pemesan"
//                         value={formData.nama_pemesan}
//                         onChange={handleChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Email Pemesan:
//                     <input
//                         type="email"
//                         name="email_pemesan"
//                         value={formData.email_pemesan}
//                         onChange={handleChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                     />
//                 </label>
//                 <br />
//                 {/* <label>
//                     Tanggal Pemesanan:
//                     <input
//                         type="datetime-local"
//                         name="tgl_pemesanan"
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                         value={formData.tgl_pemesanan}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br /> */}
//                 <label>
//                     Tanggal Check In:
//                     <input
//                         type="datetime-local"
//                         name="tgl_check_in"
//                         value={formData.tgl_check_in}
//                         onChange={handleChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Tanggal Check Out:
//                     <input
//                         type="datetime-local"
//                         name="tgl_check_out"
//                         value={formData.tgl_check_out}
//                         onChange={handleChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Nama Tamu:
//                     <input
//                         type="text"
//                         name="nama_tamu"
//                         value={formData.nama_tamu}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Jumlah Kamar:
//                     <input
//                         type="number"
//                         name="jumlah_kamar"
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                         value={formData.jumlah_kamar}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 {/* <label>
//                     Nomor Kamar:
//                     <select
//                         name="nomor_kamar"
//                         value={formData.nomor_kamar}
//                         onChange={handleChange}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                     >
//                         <option value="">Select Kamar</option>
//                         {kamarOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 </label> */}
//                 <br />
//                 <label>
//                     Status Pemesanan:
//                     <input
//                         type="text"
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                         name="status_pemesanan"
//                         value={formData.status_pemesanan}
//                         onChange={handleChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Nama User:
//                     <select
//                         name="nama_user"
//                         value={formData.nama_user}
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                         onChange={handleChange}
//                     >
//                         <option value="">Select User</option>
//                         {userOptions.map((option) => (
//                             <option key={option.value} value={option.value}>
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 </label>
//                 <br />
//                 {/* <label>
//                     Jumlah 
//                     <input
//                         type="number"
//                         name="harga"
//                         className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//                         value={formData.details_of_pemesanan[0].harga}
//                         onChange={handleChange}
//                     />
//                 </label> */}
//                 <br />
//                 <br />
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
//                   onClick={handleClick}
//                 >
//                   Back
//                 </button>
//                 <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
//                   Add
//                 </button>
//             </form>
//             </div>
//         </div>
//     );
// };

// export default AddOrder;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router";
let config = {}
let token = ""


const AddOrder = () => {
  const [formData, setFormData] = useState({
    tipe_kamar: '',
    nama_pemesan: '',
    email_pemesan: '',
    tgl_check_in: '',
    tgl_check_out: '',
    nama_tamu: '',
    jumlah_kamar: '',
    status_pemesanan: '',
    nama_user: '',
  });

  useEffect(()=>{
    token=window.sessionStorage.getItem("token")
    console.log(token);
    config= {   
     headers:{
       Authorization: `Bearer ${token}`
     }
    }
   },[])

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
    [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Lakukan validasi data jika diperlukan sebelum mengirim ke server

      // Kirim data ke server menggunakan metode POST
      const response = await axios.post('http://localhost:8000/pemesanan/addPemesanan',
        formData, // Kirim semua data formData ke server
        config // Sertakan konfigurasi headers (Authorization token) jika diperlukan
      );
      setFormData({
        tipe_kamar: '',
      nama_pemesan: '',
      email_pemesan: '',
      tgl_check_in: '',
      tgl_check_out: '',
      nama_tamu: '',
      jumlah_kamar: '',
      status_pemesanan: '',
      nama_user: '',
      })

      // Handle respons dari server sesuai kebutuhan, contoh:
      console.log('Respon dari server:', response.data);
      // Lakukan navigasi ke halaman orderlist atau halaman lainnya jika diperlukan
      router.push('/resepsionis/orderlist');
      
    } catch (error) {
      console.error('Kesalahan saat mengirim data:', error);
      console.log(formData)
      // Handle kesalahan sesuai kebutuhan aplikasi Anda
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='w-3/4 mt-10 bg-blue-100 p-10 rounded-md'>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Tipe Kamar:
            </label>
            <input
              type="text"
              name="tipe_kamar"    
              value={formData.tipe_kamar}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Pemesan:
            </label>
            <input
              type="text"
              name="nama_pemesan"
              value={formData.nama_pemesan}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Pemesan:
            </label>
            <input
              type="email"
              name="email_pemesan"
              value={formData.email_pemesan}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tanggal Check In:
            </label>
            <input
              type="datetime-local"
              name="tgl_check_in"
              value={formData.tgl_check_in}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tanggal Check Out:
            </label>
            <input
              type="datetime-local"
              name="tgl_check_out"
              value={formData.tgl_check_out}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
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
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
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
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Status Pemesanan:
            </label>
            <input
              type="text"
              name="status_pemesanan"
              value={formData.status_pemesanan}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama User:
            </label>
            <input
              type="text"
              name="nama_user"
              value={formData.nama_user}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            />
          </div>

          <div className="flex items-center mt-8">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              onClick={() => router.push('/orderlist')}
            >
              Back
            </button>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;

