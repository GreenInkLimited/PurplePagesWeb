import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExternalLinkLine from "../../assets/ExternalLinkLine.png";
import Delete from "../../assets/Delete.png";
import { getWishlist } from "../../apis/WishlistApis";
import Logo from "../../assets/pplogo.png";
import { DeleteWishlist } from "../../apis/WishlistApis";
import { MdClear } from "react-icons/md";

const ProductWishlist = () => {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const response = await getWishlist({ pageParam: 0 });
				setWishlist(response); // Set the user state with the response data directly
				setLoading(false);
			} catch (error) {
				console.log("Error fetching Wishlists:", error);
			}
		};
		fetchWishlist();
	}, []);

	const handleDelete = (productId) => {
		setItemToDelete(productId);
		setShowModal(true);
	};

	const confirmDelete = async () => {
		try {
			await DeleteWishlist({ product_id: itemToDelete });
			setWishlist((prevWishlist) =>
				prevWishlist.filter((item) => item.id !== itemToDelete)
			);
			setShowModal(false); // Hide the modal after successful delete
		} catch (error) {
			console.log("Error deleting item:", error);
		}
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} />
			</div>
		);
	}

	return (
		<div className='productwishlist__container'>
			<div className='productwishlist__wrapper'>
				{wishlist.length === 0 ? (
					<div className='empity-productwishlist__container'>
						<h4>You have no product(s) in your wishlist</h4>
						<p>Explore the products and services by diverse businesses.</p>
						<Link to='/apphome/' className='empty__wishlist'>
							Go Home
						</Link>
					</div>
				) : (
					wishlist.map(({ id, image, price, caption }) => (
						<div className='productwishlist__value' key={id}>
							<div className='productwishlist__right'>
								<img src={`https://api3.greeninkltd.com/${image}`} alt='icon' />
								<div>
									<Link to={`/singleproduct/${id}`}>
										<p className='product-wishlist__name'>{caption}</p>
									</Link>
									<p>
										<b>
											<span className='naira_font'>₦</span>
											{price}.00
										</b>
									</p>
								</div>
							</div>
							<div className='productwishlist__left'>
								<img
									className='productwishlist__frame'
									src={ExternalLinkLine}
									alt=''
								/>
								<img
									className='productwishlist__frame'
									src={Delete}
									alt=''
									onClick={() => handleDelete(id)}
								/>
							</div>
						</div>
					))
				)}
			</div>

			{showModal && (
				<div className='delete__product__modal-container'>
					<div className='delete__product__modal-wrapper'>
						<div className='create__business-header'>
							<span>
								<MdClear onClick={() => setShowModal(false)} />
							</span>
							<div className='create__business-detail'>
								<h4>Remove Product from Wishlist</h4>
							</div>
						</div>
						<p>This will remove this product from your wishlist</p>
						<div className='promote__button-containerxx'>
							<button
								className='user_user__button__cancel'
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button
								className='user_user__button__signout'
								onClick={confirmDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductWishlist;
