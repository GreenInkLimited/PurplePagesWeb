import React, { useEffect, useState } from "react";
import Delete from "../../assets/Delete.png";
import { getBlogWishlist, DeleteBlogWishlist } from "../../apis/WishlistApis";
import Logo from "../../assets/pplogo.png";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";

const MAX_DETAIL_LENGTH = 250;
const MAX_DETAIL_LENGTH_MOBILE = 50;

const truncateText = (text) => {
	if (text.length <= MAX_DETAIL_LENGTH) {
		return text;
	}
	return text.slice(0, MAX_DETAIL_LENGTH) + "...";
};

const truncateTextMobile = (text) => {
	if (text.length <= MAX_DETAIL_LENGTH_MOBILE) {
		return text;
	}
	return text.slice(0, MAX_DETAIL_LENGTH_MOBILE) + "...";
};

const BlogPostWishList = () => {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [itemToDelete, setItemToDelete] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const handleDelete = (blogId) => {
		setItemToDelete(blogId);
		setShowModal(true);
	};
	const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const response = await getBlogWishlist({ pageParam: 0 });
				setWishlist(response); // Set the user state with the response data directly
				setLoading(false);
			} catch (error) {
				console.log("Error fetching Wishlists:", error);
			}
		};
		fetchWishlist();
	}, []);

	const confirmDelete = async () => {
		try {
			await DeleteBlogWishlist({ blog_id: itemToDelete });
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
				<img src={Logo} alt='logo' />
			</div>
		);
	}

	if (wishlist.length === 0) {
		return (
			<div className='empity-productwishlist__container'>
				<h4>You have no blog(s) in your wishlist</h4>
				<p>explore the blog posts by diverse businesses.</p>
				<Link to='/appblog/' className='empty__wishlist'>
					Go To Blogs
				</Link>
			</div>
		);
	}

	return (
		<div className='productwishlist__container'>
			<div className='productwishlist__wrapper'>
				{wishlist.map(
					({
						id,
						image,
						title,
						pub_date,
						detail,
						business_name,
						business_logo,
						business_id,
					}) => {
						const createdDate = new Date(pub_date);
						const options = { month: "long", day: "numeric", year: "numeric" };
						const formattedDate = createdDate.toLocaleDateString(
							"en-US",
							options
						);
						return (
							<>
								<div className='blogpostswishlist__value' key={id}>
									<img
										className='blogpostswishlist__value-img'
										src={`https://api3.greeninkltd.com/${image}`}
										alt='icon'
									/>
									<div className='blog-productwishlist__right'>
										<Link to={`/appblog/${id}`}>
											<h4 className='blogpost-title'>{title}</h4>
										</Link>
										<p>
											{isMobileView
												? truncateTextMobile(detail)
												: truncateText(detail)}
										</p>
										<div className='blogpost__bottom'>
											<Link to={`/business/${business_id}`}>
												<img
													className='blogpost__bottom-img'
													src={`https://api3.greeninkltd.com/${business_logo}`}
													alt='autor'
												/>
											</Link>
											<div className='blog__postwishlist-details'>
												<div className='blog__postwishlist-detail'>
													<Link to={`/business/${business_id}`}>
														<p>{business_name}</p>
													</Link>
													<small>{formattedDate}</small>
												</div>
												<div className='blog__post-delete'>
													<img src={Delete} onClick={() => handleDelete(id)} />
													<p>Delete</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='blogpost__bottom-mobile'>
									<img
										className='blogpost__bottom-mobile-img'
										src={`https://api3.greeninkltd.com/${business_logo}`}
										alt='autor'
									/>
									<div className='blog__postwishlist-details'>
										<div className='blog__postwishlist-detail'>
											<p>{business_name}</p>
											<small>{formattedDate}</small>
										</div>
										<div className='blog__post-delete'>
											<img src={Delete} onClick={() => handleDelete(id)} />
										</div>
									</div>
								</div>
							</>
						);
					}
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
								<h4>Remove Blog from Wishlist</h4>
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

export default BlogPostWishList;
