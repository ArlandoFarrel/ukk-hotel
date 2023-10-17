// import Link from "next/link";
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useRouter } from 'next/router';


// const Login = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('')

//   useEffect(() => {
//     const token = window.sessionStorage.getItem("token");
//     if (token) {
//       // Jika sudah terotentikasi, redirect ke halaman yang sesuai
//       const role = window.sessionStorage.getItem("role");
//       if (role === "resepsionis") {
//         router.push('/resepsionis/orderlist');
//       } else if (role === "admin") {
//         router.push('/admin');
//       } else if (role === "customer") {
//         router.push('/customerPortal');
//       }
//     }
//   }, [])

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const fetchData=await axios.post('http://localhost:8000/auth/login', {
//         email: email,
//         password: password
//       })
//       console.log(fetchData);
//       window.sessionStorage.setItem("token",fetchData.data.token)
//       window.sessionStorage.setItem("nama_user",fetchData.data.nama_user)
//       window.sessionStorage.setItem("role",fetchData.data.role)
//       window.sessionStorage.setItem("id",fetchData.data.id)
//       // router.push('/dashboard');
//       if (fetchData.data.role==="resepsionis") {
//         router.push('/resepsionis/orderlist')
//         console.log("resepsionis");
//       }else if(fetchData.data.role==="admin"){
//         console.log("admin");
//         router.push('/admin')
//       } else if(fetchData.data.role==="customer") {
//         console.log('admin')
//         router.push('/customerPortal')
//       }
//     } catch (error) {
//       if(error.response) {
//         setMsg(error.response.data.msg)
//       }
      
//     }
//   };


//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
//       <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
//         <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
//         <form className="mt-6" onSubmit={handleLogin}>
//           <p>{msg}</p>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-semibold text-gray-800"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
        
//               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
//             />
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="password"
//               className="block text-sm font-semibold text-gray-800"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
//             />
//           </div>
//           <Link
//             href="/forget"
//             className="text-xs text-blue-600 hover:underline"
//           >
//             Forget Password?
//           </Link>
//           <div className="mt-2">
//             <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
//               Login
//             </button>
//           </div>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-700">
//           Don't have an account?{" "}
//           <Link
//             href="/signup"
//             className="font-medium text-blue-600 hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const token = window.sessionStorage.getItem("token");
        if (token) {
          // Jika sudah terotentikasi, redirect ke halaman yang sesuai
          const role = window.sessionStorage.getItem("role");
          if (role === "resepsionis") {
            router.push('/resepsionis/orderlist');
          } else if (role === "admin") {
            router.push('/admin');
          } else if (role === "customer") {
            router.push('/customerPortal');
          }
        }
      }, [])

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const fetchData = await axios.post('http://localhost:8000/auth/login', {
        email: email,
        password: password
      });
      console.log(fetchData);
      window.sessionStorage.setItem("token", fetchData.data.token);
      window.sessionStorage.setItem("nama_user", fetchData.data.nama_user);
      window.sessionStorage.setItem("role", fetchData.data.role);
      window.sessionStorage.setItem("id", fetchData.data.id);

      if (fetchData.data.role === "resepsionis") {
        router.push('/resepsionis/orderlist');
      } else if (fetchData.data.role === "admin") {
        router.push('/admin');
      } else if (fetchData.data.role === "customer") {
        router.push('/customerPortal');
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.msg); // Mengatur pesan kesalahan dari respons server
        // Menampilkan pesan kesalahan menggunakan alert
        alert('User not found');
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
        <form className="mt-6" onSubmit={handleLogin}>
          {/* Menampilkan pesan kesalahan menggunakan alert */}
          {errorMsg && <div className="text-red-500 mb-4">{errorMsg}</div>}

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-2">
            <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
