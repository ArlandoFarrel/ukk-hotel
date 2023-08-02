import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('nama_user');
    window.sessionStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <nav className="bg-sky-950 h-screen w-64 fixed top-0 left-0 flex flex-col justify-between p-4">
      <div>
        <Link href="/" className="text-white font-bold text-xl mb-8">
          Dashboard
        </Link>
        <ul className="space-y-6 my-6">
          <li>
            <Link href="/roomlist" className="text-white hover:underline">
              Room List
            </Link>
          </li>
          <li>
            <Link href="/typeroomlist" className="text-white hover:underline">
              Type Room List
            </Link>
          </li>
          <li>
            <Link href="/orderlist" className="text-white hover:underline">
              Pemesanan
            </Link>
          </li>
        </ul>
        <button
        onClick={handleLogout}
        className="text-white hover:underline mb-4"
      >
        Log Out
      </button>
      </div>
     
    </nav>
  );
};

export default Sidebar;
