import React from "react";
import style from "./style.module.scss";

interface PaginationProps {
  currentPage: number;
  totalRows: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRows,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate the range of rows for the current page
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  return (
    <div className={style.pagination}>
      <button
        onClick={handlePrevious}
        className={style.navButton}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className={style.pageSummary}>
        {startRow} to {endRow}{" "}
        <span className={style.light}>of {totalRows} rows</span>
      </span>

      <button
        className={style.navButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
