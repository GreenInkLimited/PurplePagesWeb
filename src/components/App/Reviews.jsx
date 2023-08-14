import React, { useEffect, useState } from "react";
import { review } from "../../data";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import Progress from "./Progress";
import { getBusinessById } from "../../apis/BusinessApi";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const Reviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);
  const { id } = useParams();
  //const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: business, isLoading } = useQuery("business", () =>
    getBusinessById({ id })
  );

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
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className={currentPage === 1 ? "disabled" : null}
        >
          Prev
        </button>
        {startPage > 1 && <button onClick={() => handleClick(1)}>1</button>}
        {startPage > 2 && <span className="ellipsis">...</span>}
        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <button
            key={number}
            onClick={() => handleClick(number)}
            className={currentPage === number ? "active" : null}
          >
            {number}
          </button>
        ))}
        {endPage < pageNumbers.length - 1 && (
          <span className="ellipsis">...</span>
        )}
        {endPage < pageNumbers.length && (
          <button onClick={() => handleClick(pageNumbers.length)}>
            {pageNumbers.length}
          </button>
        )}
        <button
          disabled={currentPage === pageNumbers.length}
          onClick={handleNextPage}
          className={currentPage === pageNumbers.length ? "disabled" : null}
        >
          Next
        </button>
      </div>
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = review.slice(indexOfFirstProduct, indexOfLastProduct);
  const numReviews = business?.reviews.length ?? 0;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  // Calculate the average reviews rating
  const reviews = business?.reviews ?? [];
  const totalReviews = reviews.length;
  const sumRatings = reviews.reduce(
    (sum, review) => sum + Number(review.rating),
    0
  );
  const averageRating = totalReviews > 0 ? sumRatings / totalReviews : 0;

  // Calculate the number of full stars to display
  const fullStars = Math.floor(averageRating);
  // Calculate the number of half stars to display
  const hasHalfStar = averageRating % 1 !== 0;
  // Calculate the number of empty stars to display
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const numFiveRatings = reviews.filter(
    (review) => review.rating === "5"
  ).length;
  const numFourRatings = reviews.filter(
    (review) => review.rating === "4"
  ).length;
  const numThreeRatings = reviews.filter(
    (review) => review.rating === "3"
  ).length;
  const numTwoRatings = reviews.filter(
    (review) => review.rating === "2"
  ).length;
  const numOneRatings = reviews.filter(
    (review) => review.rating === "1"
  ).length;
  const percentageFiveRatings = (numFiveRatings / totalReviews) * 100;
  const percentageFourRatings = (numFourRatings / totalReviews) * 100;
  const percentageThreeRatings = (numThreeRatings / totalReviews) * 100;
  const percentageTwoRatings = (numTwoRatings / totalReviews) * 100;
  const percentageOneRatings = (numOneRatings / totalReviews) * 100;

  return (
    <div className="review__container">
      <div className="review__value">
        <div className="review__top__right">
          <h3>
            {averageRating}
            <span>/5</span>
          </h3>
          <div className="rating">
            {[...Array(fullStars)].map((_, index) => (
              <ImStarFull key={`full-${index}`} />
            ))}
            {hasHalfStar && <ImStarHalf key="half" />}
            {[...Array(emptyStars)].map((_, index) => (
              <ImStarEmpty key={`empty-${index}`} />
            ))}
          </div>
          <p>
            Based on {numReviews}{" "}
            {numReviews === 1 ? "verified user" : "verified users"}{" "}
          </p>
        </div>
        <div className="review__top__left">
          <div className="progress_content">
            <div className="on_the_left">
              <small>5</small>
              <ImStarFull className="rating" />
            </div>
            <Progress done={percentageFiveRatings} />
            <div className="on_the_right">
              <small>{numFiveRatings}</small>
            </div>
          </div>
          <div className="progress_content">
            <div className="on_the_left">
              <small>4</small>
              <ImStarFull className="rating" />
            </div>
            <Progress done={percentageFourRatings} />
            <div className="on_the_right">
              <small>{numFourRatings}</small>
            </div>
          </div>
          <div className="progress_content">
            <div className="on_the_left">
              <small>3</small>

              <ImStarFull className="rating" />
            </div>
            <Progress done={percentageThreeRatings} />
            <div className="on_the_right">
              <small>{numThreeRatings}</small>
            </div>
          </div>
          <div className="progress_content">
            <div className="on_the_left">
              <small>2</small>

              <ImStarFull className="rating" />
            </div>
            <Progress done={percentageTwoRatings} />
            <div className="on_the_right">
              <small>{numTwoRatings}</small>
            </div>
          </div>
          <div className="progress_content">
            <div className="on_the_left">
              <small>1</small>

              <ImStarFull className="rating" />
            </div>
            <Progress done={percentageOneRatings} />
            <div className="on_the_right">
              <small>{numOneRatings}</small>
            </div>
          </div>
        </div>
      </div>
      {totalReviews > 0 && (
        <div className="review__wrapper">
          {business?.reviews.map((review) => {
            // Calculate the number of full stars to display
            const fullStars = Math.floor(review.rating);
            // Calculate the number of half stars to display
            const hasHalfStar = review.rating % 1 !== 0;
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
                    <h4>{review.username}</h4>
                    <small>{formatDate(review.pub_date)}</small>
                  </div>
                  <div className="review__right">
                    <h4>Review Title</h4>
                    <p>{review.detail}</p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
      {totalReviews > 4 && renderPageNumbers()}
    </div>
  );
};

export default Reviews;
