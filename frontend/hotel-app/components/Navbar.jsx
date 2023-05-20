import  Link  from 'next/link';
import {useRouter} from 'next/router';

const Navbar = () => {
  const router = useRouter()

  const handleLogout = ()=>{
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('nama_user')
    window.sessionStorage.removeItem('role')
    router.push('/login')
  }


  return (
    <nav className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl">
          My Hotel
        </Link>
        <ul className="flex space-x-8">
            
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
          <li>
            <button onClick={handleLogout} className="text-white hover:underline">
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
