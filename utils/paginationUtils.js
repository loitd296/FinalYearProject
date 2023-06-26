// paginationUtils.js

const calculatePageRange = (currentPage, totalPages, range) => {
  const halfRange = Math.floor(range / 2);
  let startPage = currentPage - halfRange;
  let endPage = currentPage + halfRange;

  if (startPage <= 0) {
    endPage -= startPage - 1;
    startPage = 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    if (endPage - range + 1 > 0) {
      startPage = endPage - range + 1;
    } else {
      startPage = 1;
    }
  }

  return { startPage, endPage };
};

module.exports = {
  calculatePageRange,
};
