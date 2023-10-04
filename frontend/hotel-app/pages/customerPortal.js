    import Navbar from "@/components/Navbar";
    import Image from "next/image";
    import axios from "axios";
    import { useState } from "react";

    const handleSubmit = async (e) => {
        const [tglAksesSatu, setTglAksesSatu] = useState('');
  const [tglAksesDua, setTglAksesDua] = useState('');
        e.preventDefault();
      
        try {
          // Mengirim data pencarian kamar ke server
          const response = await axios.post("/http://localhost:8000/kamar/getKamarAvaible", {
            tgl_akses_satu: tglAksesSatu,
          tgl_akses_dua: tglAksesDua
          });
      
          // Handle respons dari server (jika diperlukan)
          console.log("Data kamar yang ditemukan:", response.data);
      
          // Redirect pengguna ke halaman available room
          router.push("/availRoom");
        } catch (error) {
          // Handle error jika permintaan gagal
          console.error("Gagal melakukan pencarian kamar:", error);
        }
      };
    const CustomerPortal = () => {
        return (
            <div className="">
                <Navbar  />
                <div className="h-[calc(100vh-64px)]">
                    {/* "100vh" adalah tinggi viewport, "64px" adalah tinggi navbar */}
                    <Image
                        src="/img/admin.jpg"
                        alt="Background Image"
                        layout="fill"
                        objectFit="cover"
                        style={{ zIndex: -1 }} // Mengatur z-index untuk memastikan gambar di lapisan yang lebih rendah
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center max-w-[50vw] max-h-[45vh] mx-auto my-auto bg-gradient-to-r from-teal-950 to-cyan-900 rounded-lg">
        <div className="text-white text-4xl font-bold mb-8">Cek Ketersediaan Kamar</div>

        <form className="flex items-center space-x-4">
            <label htmlFor="checkInDate" className="w-20 text-right text-white">Check In Date</label>
            <input type="date" id="checkInDate" name="checkInDate" className="border rounded p-2 focus:outline-none focus:ring focus:border-blue-500" />

            <label htmlFor="checkOutDate" className="w-20 text-right text-white">Check Out Date</label>
            <input type="date" id="checkOutDate" name="checkOutDate" className="border rounded p-2" />

            <button type="submit" className="bg-cyan-900 text-white px-4 py-2 rounded hover:bg-teal-950">Submit</button>
        </form>
    </div>



                </div>
            </div>
        );
    };

    export default CustomerPortal;
