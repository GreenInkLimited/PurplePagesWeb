import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMyBusinessById } from "../../apis/BusinessApi";
import Logo from "../../assets/pplogo.png";
import { AiOutlinePlus } from "react-icons/ai";
import AddProduct from "./AddProduct";
import { useQuery } from "react-query";

const UserProductAndService = () => {
	const { id } = useParams();
	const [showAddProductModal, setShowAddProductModal] = useState(false);
	const [showWishlistButton, setShowWishlistButton] = useState(true);
	const [isScrollingUp, setIsScrollingUp] = useState(false);

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
		setIsScrollingUp(scrollTop < 500); // Adjust the scroll threshold as needed
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

	const handleAddProduct = () => {
		setShowAddProductModal(false);
		setShowWishlistButton(true);
	};

	return (
		<div className='user__productandservice__container'>
			<div className='user__productandservice__wrapper'>
				{business?.products.length > 0 ? (
					business?.products.map((product) => (
						<Link to={`/singleproduct/${product.id}`} key={product.id}>
							<div className='user__productandservice__value'>
								<img
									className='user__productandservice__value-img'
									src={`https://api3.greeninkltd.com/${product.image}`}
									alt='icon'
								/>
							</div>
						</Link>
					))
				) : (
					<div className='empty-productandservice__container'>
						<h4>Add your first product/service</h4>
						<p>
							Products and services are what you offer to your customers,
							ranging from physical goods to digital services. In other words,
							these are the items that you are selling to your customers.
						</p>
					</div>
				)}
			</div>
			{showAddProductModal && (
				<div className='add-product-modal'>
					<AddProduct
						onCancel={closeAddProductModal}
						businessId={id}
						setProducts={handleAddProduct}
					/>
				</div>
			)}
			{!isScrollingUp &&
				showWishlistButton &&
				business?.products.length > 0 && (
					<button className='not-empty__wishlist' onClick={openAddProductModal}>
						<AiOutlinePlus className='add__product-icon' />
					</button>
				)}
		</div>
	);
};

export default UserProductAndService;
