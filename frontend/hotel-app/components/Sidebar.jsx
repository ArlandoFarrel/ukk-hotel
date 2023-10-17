import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const router = useRouter();
  const [namaUser, setNamaUser] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Access window object only on the client side
    if (typeof window !== 'undefined') {
      const storedNamaUser = window.sessionStorage.getItem('nama_user');
      const storedRole = window.sessionStorage.getItem('role');
      console.log('Stored nama_user:', storedNamaUser); // Debug statement
      console.log('Stored role:', storedRole); // Debug statement
      setNamaUser(storedNamaUser || '');
      setRole(storedRole || '');
    }
  }, []); // Empty dependency array ensures this effect runs once after the initial render
  

  const handleLogout = () => {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('nama_user');
    window.sessionStorage.removeItem('role');
    window.sessionStorage.removeItem('id');
    router.push('/login');
  };

  return (
    <nav className="bg-sky-950 h-screen w-64 fixed top-0 left-0 flex flex-col justify-between p-4">
      <div>
        <Link href="/admin" className="text-white font-bold text-xl mb-8">
          Dashboard
        </Link>
        {namaUser && role && (
          <p className="text-white mb-4">Hello, {namaUser} as {role}</p>
        )}
        <ul className="space-y-6 my-6">
          <li>
            <Link href="/admin/roomlist" className="text-white hover:underline">
              Room List
            </Link>
          </li>
          <li>
            <Link href="/admin/typeroomlist" className="text-white hover:underline">
              Type Room List
            </Link>
          </li>
          <li>
            <Link href="/resepsionis/orderlist" className="text-white hover:underline">
              Pemesanan
            </Link>
          </li>
        </ul>
        
        <button onClick={handleLogout} className="text-white hover:underline">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
