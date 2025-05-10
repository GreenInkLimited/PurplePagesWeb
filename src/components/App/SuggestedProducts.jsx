import React, { useState, useEffect } from "react";
import Frame from "../../assets/Frame.png";
import { Link } from "react-router-dom";
import { getProduct } from "../../apis/BusinessApi";

const SuggestedProducts = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await getProduct({ pageParam: 0 });
				setProducts(response || []);
			} catch (error) {
				console.log("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);

	const shuffleArray = (array) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	const shuffledProducts = shuffleArray(products).slice(0, 4); // Limit to four products

	return (
		<div className='productandservice__container'>
			<h3>YOU MIGHT LIKE</h3>
			<div className='productandservice__wrapper x'>
				{shuffledProducts.length > 0 ? (
					shuffledProducts.map(({ id, image, price, caption }) => (
						<div className='productandservice__value x' key={id}>
							<img
								className='framex'
								src={`https://api3.greeninkltd.com/${image}`}
								alt='icon'
							/>
							<Link to={`/singleproduct/${id}`}>
								<small>{caption}</small>
							</Link>
							<p>
								<span className='naira_font'>₦</span>
								{price}.00
							</p>
							<img className='frame' src={Frame} alt='' />
						</div>
					))
				) : (
					<p>No products available.</p>
				)}
			</div>
		</div>
	);
};

export default SuggestedProducts;
