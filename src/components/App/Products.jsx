import React, { useState, useEffect } from "react";
import { getBusiness } from "../../apis/BusinessApi";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { Link } from "react-router-dom";
import Logo from "../../assets/pplogo.png";

const Products = ({
	searchQuery,
	searchResults,
	filteredResults,
	selectedCategory,
	selectedLocation,
}) => {
	const [business, setBusiness] = useState([]);
	const [showCount, setShowCount] = useState(8);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBusiness = async () => {
			try {
				const response = await getBusiness({ pageParam: 0 });
				setBusiness(response);
				setLoading(false);
			} catch (error) {
				console.log("Error fetching business:", error);
			}
		};
		fetchBusiness();
	}, []);

	const handleLoadMore = () => {
		setShowCount((prevCount) => prevCount + 8);
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Logo' />
			</div>
		);
	}

	const productsToDisplay = searchQuery
		? searchResults
		: filteredResults.filter((product) => {
				const categoryMatch =
					product.category === selectedCategory || !selectedCategory;
				const locationMatch =
					product.location === selectedLocation || !selectedLocation;

				return categoryMatch && locationMatch;
		  });

	return (
		<section className='product'>
			<div className='container'>
				<div className='product__container'>
					<div className='product__wrapper'>
						{productsToDisplay.length > 0
							? productsToDisplay
									.slice(0, showCount)
									.map(
										({ id, image, name, category, location, lga, reviews }) => {
											const totalReviews = reviews.length;
											const sumRatings = reviews.reduce(
												(sum, review) => sum + Number(review.rating),
												0
											);
											const averageRating =
												totalReviews > 0 ? sumRatings / totalReviews : 0;
											const fullStars = Math.floor(averageRating);
											const hasHalfStar = averageRating % 1 !== 0;
											const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

											return (
												<div className='product__value' key={id}>
													<Link to={`/business/${id}`}>
														<img
															className='product__value-img'
															src={`https://api3.greeninkltd.com/${image}`}
															alt='icon'
														/>
														<h4>{name}</h4>
														<p>{category}</p>
														<small>
															{lga}, {location}
														</small>
														<div className='rating'>
															{[...Array(fullStars)].map((_, index) => (
																<ImStarFull key={index} />
															))}
															{hasHalfStar && <ImStarHalf />}
															{[...Array(emptyStars)].map((_, index) => (
																<ImStarEmpty key={index} />
															))}
														</div>
													</Link>
												</div>
											);
										}
									)
							: business
									.slice(0, showCount)
									.map(
										({ id, image, name, category, location, lga, reviews }) => {
											const totalReviews = reviews.length;
											const sumRatings = reviews.reduce(
												(sum, review) => sum + Number(review.rating),
												0
											);
											const averageRating =
												totalReviews > 0 ? sumRatings / totalReviews : 0;
											const fullStars = Math.floor(averageRating);
											const hasHalfStar = averageRating % 1 !== 0;
											const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

											return (
												<div className='product__value' key={id}>
													<Link to={`/business/${id}`}>
														<img
															className='product__value-img'
															src={`https://api3.greeninkltd.com/${image}`}
															alt='icon'
														/>
														<h4>{name}</h4>
														<p>{category}</p>
														<small>
															{lga}, {location}{" "}
														</small>
														<div className='rating'>
															{[...Array(fullStars)].map((_, index) => (
																<ImStarFull key={index} />
															))}
															{hasHalfStar && <ImStarHalf />}
															{[...Array(emptyStars)].map((_, index) => (
																<ImStarEmpty key={index} />
															))}
														</div>
													</Link>
												</div>
											);
										}
									)}
					</div>
				</div>
				{showCount < business.length && (
					<div className='product__load-more'>
						<button onClick={handleLoadMore}>Load More....</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Products;
