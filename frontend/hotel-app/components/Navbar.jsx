import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 // Ganti ini dengan keadaan login pengguna dari backend atau state management Anda
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };
  const router = useRouter()
  useEffect(() => {
    // Check the user's authentication status, for example, by checking the presence of a token
    const token = window.sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, set isLoggedIn to true indicating the user is logged in
    } else {
      setIsLoggedIn(false); // If token doesn't exist, set isLoggedIn to false indicating the user is not logged in
    }
  }, [])

  const confirmLogout = () => {
    // Hapus token atau lakukan logika logout di sini
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('nama_user');
    window.sessionStorage.removeItem('role');
    window.sessionStorage.removeItem('id');
    setIsLoggedIn(false);
    setIsLogoutModalOpen(false);
    // router.push('/customerPortal')
    router.push('/customerPortal');
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleRiwayatClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault(); // Prevent the default link behavior
      alert('Anda harus login terlebih dahulu untuk melihat riwayat.');
    }
  };


  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="bg-gradient-to-r from-slate-900 to-cyan-900 text-transparent bg-clip-text text-2xl font-bold">
          <Link href="/customerPortal">SareTilem</Link>
        </div>
        <div className="space-x-12 mx-6">
          <Link
            href="/customerPortal"
            className="text-cyan-900 hover:text-slate-900 font-semibold transition duration-300"
          >
            Beranda
          </Link>
          <Link
            href="/customerhistory"
            onClick={handleRiwayatClick}
            className="text-cyan-900 hover:text-slate-900 font-semibold transition duration-300"
          >
            Riwayat
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-cyan-900 hover:text-slate-900 font-semibold transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-cyan-900 hover:text-slate-900 font-semibold transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <p className="text-xl font-semibold mb-4">Apakah Anda yakin ingin logout?</p>
            <div className="flex justify-end">
              <button
                onClick={cancelLogout}
                className="text-slate-900 font-semibold mr-4 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="bg-slate-900 text-white font-semibold px-4 py-2 rounded cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
