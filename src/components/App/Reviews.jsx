import React, {useEffect, useState} from 'react'
import { review } from '../../data';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im'
import Progress from './Progress';
import { getBusinessById } from '../../apis/BusinessApi';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getBusinessById({ id });
        setBusiness(businessData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBusiness();
  }, [id]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(review.length / productsPerPage); i++) {
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
      <div className="pagination">
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
  const currentProducts = review.slice(indexOfFirstProduct, indexOfLastProduct);
  return (
        <div className="review__container">
            <div className="review__value">
            <div className="review__top__right">
                <h3>3.5<span>/5</span></h3>
                <div className="rating">
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarHalf />
                    <ImStarEmpty />
                </div>
                <p>Based on 75 verified users</p>
                
            </div>
                <div className="review__top__left">
            <div className="progress_content">
                <div className='on_the_left'>
                  <small>5</small>  
                    <ImStarFull className="rating"/>
                </div>
                <Progress done="60"/>
                <div className='on_the_right'><small>45</small></div>
            </div>
            <div className="progress_content">
                <div className='on_the_left'>
                    <small>4</small>  
                    <ImStarFull className="rating"/>
                </div>
                <Progress done="16"/>
                <div className='on_the_right'><small>12</small></div>
                </div>
                <div className="progress_content">
                <div className='on_the_left'>
                    <small>3</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                <Progress done="17"/>
                 <div className='on_the_right'><small>13</small></div>
                </div>
                <div className="progress_content">
                <div className='on_the_left'>
                    <small>2</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                <Progress done="1"/>
                 <div className='on_the_right'><small>1</small></div>
                </div>
                <div className="progress_content">
                <div className='on_the_left'>
                    <small>1</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                <Progress done="4"/>
                 <div className='on_the_right'><small>2</small></div>
                </div>
                </div>
            </div>
          <div className='review__wrapper'>
            
            {currentProducts.map(({ id, rating, name, date, title, review}) => {
              // Calculate the number of full stars to display
              const fullStars = Math.floor(rating);
              // Calculate the number of half stars to display
              const hasHalfStar = rating % 1 !== 0;
              // Calculate the number of empty stars to display
              const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
              
              return (
                <section>
                
                <div className="my-review__value" key={id}>
                    
                  <div className="review_left">
                        <div className="rating">
                    {[...Array(fullStars)].map((_, index) => (
                      <ImStarFull key={index} />
                    ))}
                    {hasHalfStar && <ImStarHalf />}
                    {[...Array(emptyStars)].map((_, index) => (
                      <ImStarEmpty key={index} />
                    ))}
                  </div>
                        <h4>{name}</h4>
                        <small>{date}</small>
                  </div>
                  <div className="review__right">
                    <h4>{title}</h4>
                    <p>{review}</p>
                  </div>
                </div>
                </section>
              );
            })}
          </div>
          {renderPageNumbers()}
        </div>
        
      
    
  );
}

export default Reviews;

