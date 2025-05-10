import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from "../../assets/pplogo.png";
import { getMyBusinessById } from "../../apis/BusinessApi";
import Pen from "../../assets/Pen.png";
import AddBlog from "./AddBlog";
import { AiOutlinePlus } from "react-icons/ai";
import { useQuery } from "react-query";

const MAX_DETAIL_LENGTH = 80;

const truncateText = (text) => {
	if (text.length <= MAX_DETAIL_LENGTH) {
		return text;
	}
	return text.slice(0, MAX_DETAIL_LENGTH) + "...";
};

const UserBlog = () => {
	const { id } = useParams();

	const [showAddProductModal, setShowAddProductModal] = useState(false);
	const [showWishlistButton, setShowWishlistButton] = useState(true);

	const { data: business, isLoading } = useQuery("business", () =>
		getMyBusinessById({ id })
	);

	const openAddProductModal = () => {
		setShowAddProductModal(true);
		setShowWishlistButton(false);
	};

	const closeAddProductModal = () => {
		setShowAddProductModal(false);
		setShowWishlistButton(true);
	};

	const handleScroll = () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		setShowWishlistButton(scrollTop > 500);
	};

	const handleAddProduct = () => {
		setShowAddProductModal(false);
		setShowWishlistButton(true);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	if (isLoading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Loading' />
			</div>
		);
	}

	return (
		<div className='blog'>
			<div className=''>
				<div className='user-blog__wrapper'>
					{business?.blogs.length > 0 ? (
						business?.blogs.map((blog) => (
							<div className='subscription__value-sub' key={id}>
								<img
									className='subscription__value-img-sub'
									src={`https://api3.greeninkltd.com/${blog.image}`}
									alt='icon'
								/>
								<Link to={`/appblog/${blog.id}`}>
									<h2>{blog.title}</h2>
								</Link>
								<small className='subcription__wrapper-sub-paragraph'>
									{truncateText(blog.detail)}
								</small>
							</div>
						))
					) : (
						<div className='empty-productandservice__container blog'>
							<h4>Write your first blog</h4>
							<small>
								Have any thoughts, ideas or stories you’ll love to share?
							</small>
							<button
								className='empty__wishlist blog'
								onClick={openAddProductModal}
							>
								<img src={Pen} alt='pen' /> write
							</button>
						</div>
					)}
				</div>
				{showAddProductModal && (
					<div className='add-product-modal'>
						<AddBlog
							onCancel={closeAddProductModal}
							businessId={id}
							setProducts={handleAddProduct}
						/>
					</div>
				)}
				{showWishlistButton && business?.blogs.length > 0 && (
					<button className='not-empty__wishlist' onClick={openAddProductModal}>
						<AiOutlinePlus className='add__product-icon' />
					</button>
				)}
			</div>
		</div>
	);
};

export default UserBlog;
