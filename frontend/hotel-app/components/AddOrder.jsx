import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/router"
import { getOrder } from './OrderList';
let config = {}
let token = ""
const AddOrder = () => {
    const [formData, setFormData] = useState({
        nomor_pemesanan: '',
        nama_pemesan: '',
        email_pemesan: '',
        tgl_pemesanan: '',
        tgl_check_in: '',
        tgl_check_out: '',
        nama_tamu: '',
        jumlah_kamar: '',
        nomor_kamar: '',
        status_pemesanan: '',
        nama_user: '',
        details_of_pemesanan: [{ harga: 0 }]
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
    const router = useRouter()
    const [userOptions, setUserOptions] = useState([]);
    const [kamarOptions, setKamarOptions] = useState([]);

    useEffect(() => {
        fetchUserOptions();
        fetchKamarOptions();
    }, []);

    const fetchUserOptions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/getAllUser', config);
            const users = response.data.data;
            const options = users.map((user) => ({
                value: user.id_user,
                label: user.nama_user,
            }));
            setUserOptions(options);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchKamarOptions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/kamar/getAllKamar', config);
            const kamars = response.data.data;
            const options = kamars.map((kamar) => ({
                value: kamar.nomor_kamar,
                label: kamar.nomor_kamar,
            }));
            setKamarOptions(options);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'harga') {
            // Update the harga field in the first object of details_of_pemesanan array
            setFormData({
              ...formData,
              details_of_pemesanan: [{ harga: e.target.value }]
            });
          } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(
            'http://localhost:8000/pemesanan/addPemesanan',
            formData,
            config
          );
          console.log(response.data);
          // Reset the form after successful submission
          setFormData({
            nomor_pemesanan: '',
            nama_pemesan: '',
            email_pemesan: '',
            tgl_pemesanan: '',
            tgl_check_in: '',
            tgl_check_out: '',
            nama_tamu: '',
            jumlah_kamar: '',
            nomor_kamar: '',
            status_pemesanan: '',
            nama_user: '',
            details_of_pemesanan: [{harga:0}],
          });
          // Update the order list
          router.push('/orderlist');
        } catch (error) {
          console.error(error);
        }
      };
      
    const handleClick = () => {
        router.push('/orderlist');
    };

    return (
        <div className='flex justify-center'>

            <div className='w-3/4 mt-10 bg-blue-100 p-10 rounded-md'>
            <form onSubmit={handleSubmit}>
                <label>
                    Nomor Pemesanan:
                    <input
                        type="text"
                        name="nomor_pemesanan"
                        value={formData.nomor_pemesanan}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                    />
                </label>
                <br />
                <label>
                    Nama Pemesan:
                    <input
                        type="text"
                        name="nama_pemesan"
                        value={formData.nama_pemesan}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                    />
                </label>
                <br />
                <label>
                    Email Pemesan:
                    <input
                        type="email"
                        name="email_pemesan"
                        value={formData.email_pemesan}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                    />
                </label>
                <br />
                <label>
                    Tanggal Pemesanan:
                    <input
                        type="datetime-local"
                        name="tgl_pemesanan"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                        value={formData.tgl_pemesanan}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Tanggal Check In:
                    <input
                        type="datetime-local"
                        name="tgl_check_in"
                        value={formData.tgl_check_in}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                    />
                </label>
                <br />
                <label>
                    Tanggal Check Out:
                    <input
                        type="datetime-local"
                        name="tgl_check_out"
                        value={formData.tgl_check_out}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                    />
                </label>
                <br />
                <label>
                    Nama Tamu:
                    <input
                        type="text"
                        name="nama_tamu"
                        value={formData.nama_tamu}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Jumlah Kamar:
                    <input
                        type="number"
                        name="jumlah_kamar"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                        value={formData.jumlah_kamar}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Nomor Kamar:
                    <select
                        name="nomor_kamar"
                        value={formData.nomor_kamar}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                    >
                        <option value="">Select Kamar</option>
                        {kamarOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Status Pemesanan:
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                        name="status_pemesanan"
                        value={formData.status_pemesanan}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Nama User:
                    <select
                        name="nama_user"
                        value={formData.nama_user}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                        onChange={handleChange}
                    >
                        <option value="">Select User</option>
                        {userOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Jumlah 
                    <input
                        type="number"
                        name="harga"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
                        value={formData.details_of_pemesanan[0].harga}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <br />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                  onClick={handleClick}
                >
                  Back
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Add
                </button>
            </form>
            </div>
        </div>
    );
};

export default AddOrder;
