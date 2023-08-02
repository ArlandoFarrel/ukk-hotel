import Link from 'next/link';

const Navbar = ({ onSidebarToggle }) => {
  return (
    <nav className="bg-sky-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          className="text-white font-bold text-xl"
          onClick={onSidebarToggle}
        >
          ☰ My Hotel
        </button>
        {/* Other navigation items here */}
      </div>
    </nav>
  );
};

export default Navbar;
