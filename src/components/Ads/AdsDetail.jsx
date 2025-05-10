import React, { useEffect, useState } from "react";
import {
	AiOutlineLike,
	AiOutlineShareAlt,
	AiOutlineEye,
	AiFillLike,
} from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import {
	AddAdsComment,
	AddAdsLike,
	getAdsById,
	incrementViews,
	getAllAds,
	addCommentReply,
} from "../../apis/AdsApis";
import Logo from "../../assets/pplogo.png";
import { AddAdsWishlist } from "../../apis/WishlistApis";
import { SubscribeToBusiness } from "../../apis/BusinessApi";
import AdsbannerModal from "../Modals/AdsBannerModal";

const AdsDetail = () => {
	const { id } = useParams();
	const [ads, setAds] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isLiked, setIsLiked] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [subscribed, setSubscribed] = useState(false);
	const [adverts, setAdverts] = useState([]);
	const [viewed, setViewed] = useState(false);
	const [replyText, setReplyText] = useState("");
	const [replyImage, setReplyImage] = useState("");
	const [replyUser, setReplyUser] = useState("");
	const [replyIndex, setReplyIndex] = useState(-1);
	const [showReplies, setShowReplies] = useState([]);

	const [showModal, setShowModal] = useState(false);

	const handleImageClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleReplyClick = (index) => {
		if (index === replyIndex) {
			// If the clicked index is the same as the current replyIndex, cancel the reply
			setReplyIndex(-1); // Hide the reply form
			setReplyText(""); // Clear the reply textarea
		} else {
			setReplyIndex(index);
			setReplyText("");
		}
	};

	const handlePostReply = async () => {
		try {
			// Implement your logic to post the reply using the replyText state and comment index
			// You can access the comment using blog.comments[replyIndex]
			await addCommentReply({
				comment_id: ads.comments[replyIndex].id,
				reply: replyText,
				replier_name: replyUser,
				replier_image: replyImage,
			});

			// Update the comment replies in the blog state
			const updatedAds = { ...ads };
			updatedAds.comments[replyIndex].replies.push({
				id: updatedAds.comments[replyIndex].replies.length + 1,
				replier_image: "/media/default_files/default_file.png",
				replier_name: "Your Name",
				reply: replyText,
			});
			setAds(updatedAds);

			setReplyIndex(-1); // Hide the reply form
			setReplyText(""); // Clear the reply textarea
		} catch (error) {
			console.error("Error posting comment reply:", error);
		}
	};

	const handleCommentChange = (e) => {
		setCommentText(e.target.value);
	};

	const handlePostComment = async () => {
		try {
			await AddAdsComment({ ads_id: id, comment: commentText });
			const adsData = await getAdsById(id);
			setAds(adsData);
			setCommentText("");
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	const handleSubscribe = async () => {
		try {
			const auth_code = localStorage.getItem("auth_code");
			const isSubscribed = localStorage.getItem(
				`subscribed_${id}_${auth_code}`
			);

			if (isSubscribed === "true") {
				localStorage.setItem(
					`subscribed_${ads.business_id}_${auth_code}`,
					"false"
				);
				setSubscribed(false);
			} else {
				const response = await SubscribeToBusiness({
					business_id: ads.business_id,
				});
				console.log(response);
				localStorage.setItem(
					`subscribed_${ads.business_id}_${auth_code}`,
					"true"
				);
				setSubscribed(true);
			}
		} catch (error) {
			console.error("Error subscribing to business:", error);
		}
	};

	const handleShare = async () => {
		try {
			if (navigator.share) {
				// Use the Web Share API if supported
				await navigator.share({
					title: ads.title,
					text: ads.detail,
					url: window.location.href,
				});
				console.log("Shared successfully");
			} else {
				// Fallback behavior if Web Share API is not supported
				console.log("Web Share API not supported");
				// Implement your custom share functionality here (e.g., open a share dialog)
			}
		} catch (error) {
			console.error("Error sharing:", error);
		}
	};

	const handleViewReplies = (commentIndex) => {
		setShowReplies((prevShowReplies) => {
			const updatedShowReplies = [...prevShowReplies];
			updatedShowReplies[commentIndex] = !prevShowReplies[commentIndex]; // Toggle the visibility of replies
			return updatedShowReplies;
		});
	};

	useEffect(() => {
		const fetchAdverts = async () => {
			try {
				const response = await getAllAds({ pageParam: 0 });
				setAdverts(response);
				setLoading(false);
			} catch (error) {
				console.log("Error fetching adverts:", error);
			}
		};
		fetchAdverts();
	}, []);

	useEffect(() => {
		const fetchAds = async () => {
			try {
				const adsData = await getAdsById(id);
				setAds(adsData);
				setLoading(false);

				const viewedAds = JSON.parse(localStorage.getItem("viewedAds")) || [];
				if (!viewedAds.includes(id)) {
					await incrementViews(id);
					viewedAds.push(id);
					localStorage.setItem("viewedAds", JSON.stringify(viewedAds));
					setViewed(true);
				}
			} catch (error) {
				console.error("Error fetching blog:", error);
			}
		};

		fetchAds();
	}, [id]);

	const handleLikeAds = async () => {
		try {
			const auth_code = localStorage.getItem("auth_code");
			const likedStatus = JSON.parse(
				localStorage.getItem(`likedStatus_${id}_${auth_code}`)
			);

			if (likedStatus) {
				// User has already liked the blog, so unlike logic
				// Call the appropriate function to unlike the blog
				// Update the liked status in the local storage and state
				localStorage.setItem(
					`likedStatus_${id}_${auth_code}`,
					JSON.stringify(false)
				);
				setIsLiked(false);
			} else {
				// User has not liked the blog, so like logic
				await AddAdsLike({ ads_id: id, auth_code });
				// Update the liked status in the local storage and state
				localStorage.setItem(
					`likedStatus_${id}_${auth_code}`,
					JSON.stringify(true)
				);
				setIsLiked(true);
			}

			// Optionally, you can fetch the updated blog data to refresh the like count
			const updatedBlogData = await getAdsById(id);
			setAds(updatedBlogData);
		} catch (error) {
			console.error("Error liking blog:", error);
		}
	};

	const handleAddToWishlist = async () => {
		try {
			await AddAdsWishlist({ ads_id: id });
			setIsBookmarked(true);
		} catch (error) {
			console.error("Error adding blog to wishlist:", error);
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
		<div className='container blog__detail'>
			<div className='blog__detail-content'>
				<img
					src={`https://api3.greeninkltd.com/media/account_files/images/${ads.image}`}
					onClick={handleImageClick}
					alt='image'
				/>
			</div>
			<div className='blog__detail-header'>
				<div className='ads__title-body'>
					<h2>{ads.title}</h2>
					<div className='ads__title__left'>
						<BsBookmark />
						<AiOutlineShareAlt onClick={handleShare} />
					</div>
				</div>
				<p>{ads.detail}</p>

				<div className='ads__tags'>
					<div className='ads__tags-left'>
						<p onClick={handleLikeAds}>
							{isLiked ? <AiFillLike /> : <AiOutlineLike />} {ads.likes}
						</p>
						<p onClick={handleAddToWishlist}>
							{isBookmarked ? (
								// Render filled bookmark icon if isBookmarked is true
								<BsBookmarkFill />
							) : (
								<BsBookmark />
							)}
						</p>
						<p>
							<AiOutlineEye /> {ads.ads_views}
						</p>
					</div>
					<div className='ads__tags-right'>
						<p>Recently Viewed</p>
					</div>
				</div>
			</div>
			<div className='ads__body'>
				<div className='ads_body_left'>
					<div className='ads__recent-post'>
						<div className='ads__bottom'>
							<img
								src={`https://api3.greeninkltd.com/${ads.owner.image}`}
								alt='autor'
							/>
							<div className='ads__bottom-detail'>
								<Link to={`/business/${ads.owner.id}`}>
									<h4>{ads.owner.name}</h4>
								</Link>
								<p>{ads.owner.category}</p>
								<small>1.24k subscribers</small>
							</div>
							<button
								className={`subscribe ${subscribed ? "subscribed" : ""}`}
								onClick={handleSubscribe}
								disabled={subscribed}
							>
								{subscribed ? "Subscribed" : "Subscribe"}
							</button>
						</div>
						<div className='recent__post-header'>
							<h4>MOST RECENT</h4>
							<RiArrowDropDownLine />
						</div>
						{ads.comments.map((comment, commentIndex) => (
							<div className='blog__comment-body' key={commentIndex}>
								<img
									src={`https://api3.greeninkltd.com/${comment.image}`}
									alt='Comment'
								/>
								<div>
									<p>{comment.name}</p>
									{commentIndex !== replyIndex ? (
										<div className='reply__comment'>
											<small>{comment.comment}</small>
											<p onClick={() => handleReplyClick(commentIndex)}>
												Reply
											</p>
										</div>
									) : null}
									<div>
										{commentIndex === replyIndex && (
											<section className='comment__flexbox'>
												<div className='reply__form'>
													<textarea
														className='input-box-reply'
														placeholder='Reply to comment'
														value={replyText}
														onChange={(e) => setReplyText(e.target.value)}
													/>
												</div>
												<div className='reply__buttons'>
													<button
														className='post-reply'
														onClick={handlePostReply}
													>
														Post
													</button>
													<button
														className='cancel-reply'
														onClick={() => handleReplyClick(commentIndex)}
													>
														Cancel
													</button>
												</div>
											</section>
										)}

										{/* Render the replies */}
										{comment.replies.length > 0 &&
											!showReplies[commentIndex] && (
												<h4
													className='view-replies'
													onClick={() => handleViewReplies(commentIndex)}
												>
													View Replies ({comment.replies.length})
												</h4>
											)}
										{showReplies[commentIndex] && (
											<div className='replies-container'>
												{comment.replies.map((reply, replyIndex) => (
													<div
														className='blog__comment-reply'
														key={`${commentIndex}-${replyIndex}`}
													>
														<img
															src={`https://api3.greeninkltd.com/${reply.replier_image}`}
															alt='Reply'
														/>
														<div>
															<h6>{reply.replier_name}</h6>
															<small>{reply.reply}</small>
														</div>
													</div>
												))}
											</div>
										)}
										{/* Render the replies */}
									</div>
								</div>
							</div>
						))}

						<div className='comment__flexbox-ads'>
							<textarea
								placeholder='Leave a comment'
								className='input-box'
								value={commentText}
								onChange={handleCommentChange}
							/>
							<button className='post' onClick={handlePostComment}>
								Post
							</button>
						</div>
					</div>
				</div>
				<div>
					{adverts
						.filter((ad) => ad.ads_type === "brand")
						.map(({ id, title, image, owner, ads_type }) => (
							<section>
								<div className='ads__tags-right-mobile'>
									<p>Recently Viewed</p>
								</div>

								<Link to={`/ads/${id}`}>
									<div className='ads__body__right'>
										<img
											src={`https://api3.greeninkltd.com/media/account_files/images/${image}`}
											alt='img'
										/>
										<h4>{title}</h4>
										<small>{owner.name}</small>
									</div>
								</Link>
							</section>
						))}

					<div className='recent__post-header-mobile'>
						<h4>MOST RECENT</h4>
						<RiArrowDropDownLine />
					</div>
					{ads.comments.map((comment, commentIndex) => (
						<div className='ads__comment-body-mobile'>
							<img
								src={`https://api3.greeninkltd.com/${comment.image}`}
								alt=''
							/>
							<div>
								<h4>{comment.name}</h4>
								<div className='ads__comment'>
									<p>{comment.comment}</p>
									<div className='ads__info'>
										<div className='ads__info-reply'>
											<small>Reply</small>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}

					<div className='comment__flexbox-mobile'>
						<textarea
							placeholder='Leave a comment'
							className='input-box'
							value={commentText}
							onChange={handleCommentChange}
						/>
						<button className='post' onClick={handlePostComment}>
							Post
						</button>
					</div>
				</div>
			</div>
			{showModal && (
				<AdsbannerModal
					imageUrl={`https://api3.greeninkltd.com/media/account_files/images/${ads.image}`}
					onClose={handleCloseModal}
				/>
			)}
		</div>
	);
};

export default AdsDetail;
