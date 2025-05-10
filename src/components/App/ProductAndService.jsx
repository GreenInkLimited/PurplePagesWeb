import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBusinessById } from "../../apis/BusinessApi";
import Logo from "../../assets/pplogo.png";

const ProductAndService = () => {
	const { id } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(12);
	const [loading, setLoading] = useState(true);
	const [business, setBusiness] = useState(null);

	useEffect(() => {
		const fetchBusiness = async () => {
			try {
				const businessData = await getBusinessById({ id });
				setBusiness(businessData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching business:", error);
			}
		};

		fetchBusiness();
	}, [id]);

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Loading Spinner' />
			</div>
		);
	}

	if (!business || business.products.length === 0) {
		return (
			<div className='empty-productandservice__container product'>
				<h4>Business has no product/service</h4>
				<p>
					Subscribe to this business to be the first to get notification when
					they make a post
				</p>
				<br />
				<br />
				<Link className='subscribe' to='/apphome'>
					Go Home
				</Link>
			</div>
		);
	}

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = business.products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const renderPageNumbers = () => {
		const pageNumbers = Math.ceil(business.products.length / productsPerPage);

		return (
			<div className='pagination pagination--center'>
				<button
					disabled={currentPage === 1}
					onClick={handlePrevPage}
					className={currentPage === 1 ? "disabled" : null}
				>
					Prev
				</button>
				{Array.from({ length: pageNumbers }, (_, index) => index + 1).map(
					(number) => (
						<button
							key={number}
							onClick={() => setCurrentPage(number)}
							className={currentPage === number ? "active" : null}
						>
							{number}
						</button>
					)
				)}
				<button
					disabled={currentPage === pageNumbers}
					onClick={handleNextPage}
					className={currentPage === pageNumbers ? "disabled" : null}
				>
					Next
				</button>
			</div>
		);
	};

	return (
		<div className='productandservice__container'>
			<div className='productandservice__wrapper'>
				{currentProducts.map((product, index) => (
					<Link to={`/singleproduct/${product.id}`}>
						<div className='productandservice__value' key={index}>
							<img
								className='productandservice__value-img'
								src={`https://api3.greeninkltd.com/${product.image}`}
								alt='Product Icon'
							/>
							<small>{product.caption}</small>
							<p>
								<span className='naira_font'>₦</span>
								{product.price}.00
							</p>
						</div>
					</Link>
				))}
			</div>
			<div className='pagination-container'>{renderPageNumbers()}</div>
		</div>
	);
};

export default ProductAndService;
