// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';

// const AddRoom = () => {
//   const [nomor_kamar, setNomor] = useState('');
//   const [nama_tipe_kamar, setTipe] = useState('');
//   const [tipeKamarList, setTipeKamarList] = useState([]);

//   const router = useRouter();

//   const handleClick = () => {
//     router.push('/');
//   };

//   const saveUser = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('nomor_kamar', nomor_kamar);
//       formData.append('nama_tipe_kamar', nama_tipe_kamar);

//       await axios.post('http://localhost:8000/kamar/addKamar', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       router.push('/');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchTipeKamar = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/tipe/getAllTipe');
//         const tipeKamarData = response.data.data;
//         setTipeKamarList(tipeKamarData);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchTipeKamar();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-center">
//         <div className="w-3/4 mt-10 bg-blue-100 p-10 rounded-md">
//           <form onSubmit={saveUser}>
//             <div className="mb-4">
//               <label htmlFor="nomor_kamar" className="block text-sm font-medium text-gray-700 mb-1">
//                 Nomor Kamar
//               </label>
//               <input
//                 value={nomor_kamar}
//                 onChange={(e) => setNomor(e.target.value)}
//                 type="text"
//                 id="nomor_kamar"
//                 name="nomor_kamar"
//                 className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//               />
//             </div>

//             <div className="mb-4">
//               <label htmlFor="nama_tipe_kamar" className="block text-sm font-medium text-gray-700 mb-1">
//                 Nama Tipe
//               </label>
//               <select
//                 id="nama_tipe_kamar"
//                 value={nama_tipe_kamar}
//                 onChange={(e) => setTipe(e.target.value)}
//                 name="nama_tipe_kamar"
//                 className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
//               >
//                 {tipeKamarList.map((tipeKamar) => (
//                   <option key={tipeKamar.id} value={tipeKamar.nama_tipe_kamar}>
//                     {tipeKamar.nama_tipe_kamar}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
//                 onClick={handleClick}
//               >
//                 Back
//               </button>
//               <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
//                 Add
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddRoom;
 
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

let config = {}
let token = ""
const AddKamar = () => {
  const [nomorKamar, setNomorKamar] = useState('');
  const [namaTipeKamar, setNamaTipeKamar] = useState('');
  const [tipeKamarList, setTipeKamarList] = useState([]);
  const router = useRouter();
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
    const fetchTipeKamar = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tipe/getAllTipe', config);
        const tipeKamarData = response.data.data;
        setTipeKamarList(tipeKamarData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTipeKamar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tipeKamar = tipeKamarList.find((tipe) => tipe.nama_tipe_kamar === namaTipeKamar);
      if (!tipeKamar) {
        console.log('Tipe kamar tidak ditemukan');
        return;
      }

      const data = {
        nomor_kamar: nomorKamar,
        nama_tipe_kamar: namaTipeKamar,
        id_tipe_kamar: tipeKamar.id,
      };

      await axios.post('http://localhost:8000/kamar/addKamar', data, config);

      router.push('/roomlist'); // Redirect to home page after successful addition
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleClick = () => {
    router.push('/roomlist');
};

  return (
    <div>
      {/* <h2>Add Kamar</h2>  */}
      <div className="flex justify-center">
      <div className="w-3/4 mt-10 bg-blue-100 p-10 rounded-md">
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor="nomor_kamar" className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Kamar:
            </label>
          <input
            type="text"
            id="nomor_kamar"
            value={nomorKamar}
            onChange={(e) => setNomorKamar(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="nama_tipe_kamar" className="block text-sm font-medium text-gray-700 mb-1">
            Nama Tipe Kamar:
            </label>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-900"
            id="nama_tipe_kamar"
            value={namaTipeKamar}
            onChange={(e) => setNamaTipeKamar(e.target.value)}
          >
            <option value="">Pilih Tipe Kamar</option>
            {tipeKamarList.map((tipeKamar) => (
              <option key={tipeKamar.id} value={tipeKamar.nama_tipe_kamar}>
                {tipeKamar.nama_tipe_kamar}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
        <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
                  onClick={handleClick}
                >
                  Back
                </button>
        <button type="submit"  className="px-4 py-2 bg-green-500 text-white rounded-md">
          Add 
        </button>
        </div>
      </form>
      </div>
      </div>
    </div> 
  );
};

export default AddKamar;
