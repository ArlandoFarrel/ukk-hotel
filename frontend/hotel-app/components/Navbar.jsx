import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className=" p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="bg-gradient-to-r from-teal-950 to-cyan-900 text-transparent bg-clip-text text-2xl font-bold">
          <Link href="/customerPortal">
          SareTilem
          </Link>
        </div>
        <div className="space-x-12 mx-6">
          <Link  className="text-cyan-900 hover:text-teal-950  font-semibold transition duration-300"href="/customerPortal">
           Beranda
          </Link>
          <Link  className="text-cyan-900 hover:text-teal-950 font-semibold transition duration-300" href="/rooms">
            Riwayat
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
