import React from "react";

function PaginationAllProducts({ currentPage, totalPages, onPageChange }) {
  const MAX_VISIBLE_PAGES = 3; // Максимальное количество видимых номеров страниц
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const getPageNumbers = () => {
    const ellipsis = <span className="ellipsis">...</span>;

    if (totalPages <= MAX_VISIBLE_PAGES) {
      return pageNumbers;
    }

    const current = currentPage;
    const neighbors = Math.floor((MAX_VISIBLE_PAGES - 1) / 2); // Количество соседних страниц
    let startPage = current - neighbors;
    let endPage = current + neighbors;

    if (startPage <= 0) {
      startPage = 1;
      endPage = MAX_VISIBLE_PAGES;
    } else if (endPage > totalPages) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
      endPage = totalPages;
    }

    const visiblePages = pageNumbers.slice(startPage - 1, endPage);
    const firstPage = pageNumbers.slice(0, 1);
    const lastPage = pageNumbers.slice(totalPages - 1);

    return [...(startPage > 1 ? firstPage : []), ...(startPage > 1 ? [ellipsis] : []), ...visiblePages, ...(endPage < totalPages ? [ellipsis] : []), ...(endPage < totalPages ? lastPage : [])];
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        // eslint-disable-next-line react/button-has-type
        <button className="pagination__button" onClick={() => onPageChange(currentPage - 1)}>
          Back
        </button>
      )}

      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === currentPage) {
          return (
            // eslint-disable-next-line react/button-has-type
            <button
              key={index} // Уникальный ключ
              className="pagination__button pagination__button--active"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }
        if (typeof pageNumber === "number") {
          return (
            // eslint-disable-next-line react/button-has-type
            <button
              key={index} // Уникальный ключ
              className="pagination__button"
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        }
        return pageNumber; // Отображение многоточия
      })}

      {currentPage < totalPages && (
        // eslint-disable-next-line react/button-has-type
        <button className="pagination__button" onClick={() => onPageChange(currentPage + 1)}>
          Next
        </button>
      )}
    </div>
  );
}

export default PaginationAllProducts;