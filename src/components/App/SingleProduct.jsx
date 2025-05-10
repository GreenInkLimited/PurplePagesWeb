import React, { useState, useEffect } from "react";
import { getProductById } from "../../apis/BusinessApi";
import { Link, useParams } from "react-router-dom";
import Frame from "../../assets/Frame.png";
import ExternalLinkLine from "../../assets/ExternalLinkLine.png";
import Share from "../../assets/Share.png";
import MoreProducts from "./MoreProducts";
import SuggestedProducts from "./SuggestedProducts";
import Logo from "../../assets/pplogo.png";
import { AddProductWishlist, DeleteWishlist } from "../../apis/WishlistApis";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const SingleProduct = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isBookmarked, setIsBookmarked] = useState(false);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await getProductById(id);
				setProduct(productData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};

		fetchProduct();
	}, [id]);

	useEffect(() => {
		const storedIsBookmarked = localStorage.getItem("isBookmarked");
		if (storedIsBookmarked) {
			setIsBookmarked(JSON.parse(storedIsBookmarked));
		}
	}, []);

	const convertLineBreaks = (text) => {
		return text.replace(/<br\s*\/?>/gm, "\n");
	};

	useEffect(() => {
		localStorage.setItem("isBookmarked", JSON.stringify(isBookmarked));
	}, [isBookmarked]);

	const handleAddToWishlist = async () => {
		try {
			await AddProductWishlist({ product_id: id });
			setIsBookmarked(true);
		} catch (error) {
			console.error("Error adding product to wishlist:", error);
		}
	};

	const handleRemoveFromWishlist = async () => {
		try {
			await DeleteWishlist({ product_id: id });
			setIsBookmarked(false);
		} catch (error) {
			console.error("Error removing product from wishlist:", error);
		}
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: product.caption,
					text: "Check out this amazing product!",
					url: window.location.href, // Share the current page URL
				})
				.then(() => console.log("Shared successfully!"))
				.catch((error) => console.error("Error sharing:", error));
		} else {
			console.log("Sharing is not supported in this browser.");
		}
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Logo' />
			</div>
		);
	}

	return (
		<div className='container singleproduct__detail'>
			<div className='singleproduct-content'>
				<div className='singleproduct-left'>
					<img src={product.image} alt='product' />
				</div>
				<div className='singleproduct-right'>
					<div className='singleproduct__right-header'>
						<h3>{product.caption}</h3>
						<img
							src={ExternalLinkLine}
							alt='ExternalLinkLine'
							onClick={handleShare}
						/>
					</div>
					<h4 className='singleproduct'>
						<span className='naira_font'>₦</span>
						{product.price}.00
					</h4>
					<img className='frame' src={Frame} alt='frame' />
					<div className='product__desc'>
						<h5 className='product__desc__header'>Product Details</h5>
						<pre
							className='preformatted'
							style={{
								width: "100%",
								whiteSpace: "pre-wrap",
							}}
							dangerouslySetInnerHTML={{
								__html: convertLineBreaks(product.detail),
							}}
						/>
					</div>

					<div className='singlepotter__bottom'>
						<div className='singlepotter__bottom_left'>
							<img
								src={`https://api3.greeninkltd.com/${product.owner.image}`}
								alt='SingleProfile'
							/>
							<div>
								<h5>{product.owner.name}</h5>
								<small>1.24k subscribers</small>
							</div>
						</div>
						<div className='singlepotter__bottom_right'>
							<div
								className='bookmark'
								onClick={
									isBookmarked ? handleRemoveFromWishlist : handleAddToWishlist
								}
							>
								{isBookmarked ? (
									<BsBookmarkFill
										style={{
											cursor: "pointer",
											fontSize: "24px",
											color: "#C42AF7",
										}}
									/>
								) : (
									<BsBookmark
										style={{
											cursor: "pointer",
											fontSize: "24px",
											color: "#C42AF7",
										}}
									/>
								)}
							</div>
							<img
								src={Share}
								alt='Share'
								onClick={handleShare}
								style={{ cursor: "pointer" }}
							/>
						</div>
					</div>
				</div>
			</div>

			<div>
				<MoreProducts />
				<SuggestedProducts />
			</div>
		</div>
	);
};

export default SingleProduct;
