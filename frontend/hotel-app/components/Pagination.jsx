const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <nav className="inline-flex rounded-md shadow">
        {/* Tombol Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-bold py-2 px-4 rounded-l focus:outline-none`}
        >
          Previous
        </button>

        {/* Nomor Halaman */}
        <div className="flex items-center bg-white border-l border-r">
          <span className="px-4 py-2 mx-2">{currentPage}</span>
        </div>

        {/* Tombol Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-bold py-2 px-4 rounded-r focus:outline-none`}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
