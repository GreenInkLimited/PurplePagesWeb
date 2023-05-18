import React, { useState } from 'react';
import { productsandservice } from '../../data';
import { Link } from 'react-router-dom';

const ProductAndService = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(productsandservice.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    let startPage, endPage;
    if (currentPage <= 2) {
      startPage = 1;
      endPage = 3;
    } else if (currentPage >= pageNumbers.length - 1) {
      startPage = pageNumbers.length - 2;
      endPage = pageNumbers.length;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }

    return (
      <div className="paginationx">
        <button disabled={currentPage === 1} onClick={handlePrevPage} className={currentPage === 1 ? 'disabled' : null}>Prev</button>
        {startPage > 1 && <button onClick={() => handleClick(1)}>1</button>}
        {startPage > 2 && <span className="ellipsis">...</span>}
        {pageNumbers.slice(startPage - 1, endPage).map(number => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={currentPage === number ? 'active' : null}
          >
            {number}
          </button>
        ))}
        {endPage < pageNumbers.length - 1 && <span className="ellipsis">...</span>}
        {endPage < pageNumbers.length && (
          <button onClick={() => handleClick(pageNumbers.length)}>{pageNumbers.length}</button>
        )}
        <button disabled={currentPage === pageNumbers.length} onClick={handleNextPage} className={currentPage === pageNumbers.length ? 'disabled' : null}>Next</button>
      </div>
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsandservice.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="productandservice__container">
      <div className="productandservice__wrapper">
        {currentProducts.map(({ id, icon, price, name, frame }) => {
          return (
            <div className="productandservice__value" key={id}>
              <img src={icon} alt="icon" />
              <Link to={`/singleproduct/${id}`}>
                <small>{name}</small>
              </Link>
              <p>₦{price}.00</p>
              <img className="frame" src={frame} alt="" />
            </div>
          );
        })}
      </div>
      {renderPageNumbers()}
    </div>
  );
};

export default ProductAndService;