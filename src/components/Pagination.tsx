interface PaginationProp {
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({ currentPage, handlePageChange }: PaginationProp) => {
  const pages = [1, 2, 3, 4, 5];

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Previous
          </a>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <a
              href="#"
              onClick={() => handlePageChange(page)}
              className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === page
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 bg-white'
              }`}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === pages.length ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
