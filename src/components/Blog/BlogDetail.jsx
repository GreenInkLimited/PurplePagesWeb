import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineLike, AiOutlineShareAlt, AiFillLike } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
	getBlogById,
	getBlogs,
	AddBlogComment,
	AddBlogLike,
	addCommentReply,
} from "../../apis/BlogApis";
import { AddBlogWishlist } from "../../apis/WishlistApis";
import Logo from "../../assets/pplogo.png";

const MAX_DETAIL_LENGTH = 150;
const DETAIL_LENGTH = 350;

const truncateText = (text) => {
	// Remove HTML tags from the text
	const plainText = text.replace(/<[^>]+>/g, "");

	if (plainText.length <= MAX_DETAIL_LENGTH) {
		return text;
	}

	return plainText.slice(0, MAX_DETAIL_LENGTH) + "...";
};

const truncateTexter = (text) => {
	if (text.length <= DETAIL_LENGTH) {
		return text;
	}
	return text.slice(0, DETAIL_LENGTH) + "...";
};

const convertLineBreaks = (text) => {
	return text.replace(/<br\s*\/?>/gm, "\n");
};

const BlogDetail = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [isLiked, setIsLiked] = useState(false);
	const [replyText, setReplyText] = useState("");
	const [replyIndex, setReplyIndex] = useState(-1);
	const [showReplies, setShowReplies] = useState([]);

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
				comment_id: blog.comments[replyIndex].id,
				reply: replyText,
			});

			// Update the comment replies in the blog state
			const updatedBlog = { ...blog };
			updatedBlog.comments[replyIndex].replies.push({
				id: updatedBlog.comments[replyIndex].replies.length + 1,
				image: "/media/default_files/default_file.png",
				name: "Your Name",
				reply: replyText,
			});
			setBlog(updatedBlog);

			setReplyIndex(-1); // Hide the reply form
			setReplyText(""); // Clear the reply textarea
		} catch (error) {
			console.error("Error posting comment reply:", error);
		}
	};

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const blogData = await getBlogById(id);
				setBlog(blogData);
				setLoading(false);

				const auth_code = localStorage.getItem("auth_code");
				const likedStatus = JSON.parse(
					localStorage.getItem(`likedStatus_${id}_${auth_code}`)
				);
				setIsLiked(likedStatus || blogData.isLiked); // Update the isLiked state
			} catch (error) {
				console.error("Error fetching blog:", error);
			}
		};

		fetchBlog();
	}, [id]);

	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await getBlogs({ pageParam: 0 });
				const { blogs } = response;
				setBlogs(blogs);
			} catch (error) {
				console.log("Error fetching blogs:", error);
			}
		};

		fetchBlogs();
	}, []);

	const handleShareBlog = () => {
		if (navigator.share && blog && blog.image) {
			const truncatedDetail = truncateTexter(blog.detail);
			navigator
				.share({
					image: blog.image,
					title: blog.title,
					text: truncatedDetail,
					url: window.location.href,
				})
				.then(() => console.log("Blog shared successfully."))
				.catch((error) => console.error("Error sharing blog:", error));
		} else {
			console.log(
				"Web Share API is not supported in this browser or blog image is missing."
			);
		}
	};

	const handleViewReplies = (commentIndex) => {
		setShowReplies((prevShowReplies) => {
			const updatedShowReplies = [...prevShowReplies];
			updatedShowReplies[commentIndex] = !prevShowReplies[commentIndex]; // Toggle the visibility of replies
			return updatedShowReplies;
		});
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Logo' />
			</div>
		);
	}

	const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	const handleAddToWishlist = async () => {
		try {
			await AddBlogWishlist({ blog_id: id });
			setIsBookmarked(true);
		} catch (error) {
			console.error("Error adding blog to wishlist:", error);
		}
	};

	const handleCommentChange = (e) => {
		setCommentText(e.target.value);
	};

	const handlePostComment = async () => {
		try {
			await AddBlogComment({ blog_id: id, comment: commentText });
			// Optionally, you can fetch the updated blog data to refresh the comments section
			const blogData = await getBlogById(id);
			setBlog(blogData);
			setCommentText(""); // Clear the comment textarea
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	const handleLikeBlog = async () => {
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
				await AddBlogLike({ blog_id: id, auth_code });
				// Update the liked status in the local storage and state
				localStorage.setItem(
					`likedStatus_${id}_${auth_code}`,
					JSON.stringify(true)
				);
				setIsLiked(true);
			}

			// Optionally, you can fetch the updated blog data to refresh the like count
			const updatedBlogData = await getBlogById(id);
			setBlog(updatedBlogData);
		} catch (error) {
			console.error("Error liking blog:", error);
		}
	};

	// Shuffle the blogs array randomly
	const shuffledBlogs = [...blogs].sort(() => Math.random() - 0.5);
	// Take the first two blogs from the shuffled array
	const randomBlogs = shuffledBlogs.slice(0, 3);

	return (
		<div className='container blog__detail'>
			<div className='blog__detail-header'>
				<h2>{blog.title}</h2>
				<div className='blog__bottom'>
					<img
						src={`https://api3.greeninkltd.com/${blog.owner.image}`}
						alt='autor'
					/>
					<div className='blog__bottom-detail'>
						<Link to={`/business/${blog.owner.id}`}>
							<p>{blog.owner.name}</p>
						</Link>
						<small>{formattedDate}</small>
					</div>
				</div>
			</div>
			<div className='blog__detail-content'>
				<img src={blog.image} alt='Blog' />
			</div>
			<div className='blog__body'>
				<div className='blog__body_left'>
					<pre
						className='preformatted'
						style={{
							width: "100%",
							whiteSpace: "pre-wrap",
						}}
						dangerouslySetInnerHTML={{ __html: convertLineBreaks(blog.detail) }}
					/>
					<div className='blog__tags'>
						{blog.tags.split(",").map((tag, index) => (
							<p key={index}>{tag.trim()}</p>
						))}
					</div>
					<div className='blog__actions'>
						<div className='blog__actions-left' onClick={handleLikeBlog}>
							{isLiked ? <AiFillLike /> : <AiOutlineLike />}
							<p>{blog.likes.length}</p>{" "}
							{/* Display the total number of likes */}
						</div>
						<div className='blog__actions-right'>
							<div onClick={handleAddToWishlist}>
								{isBookmarked ? ( // Render filled bookmark icon if isBookmarked is true
									<BsBookmarkFill />
								) : (
									<BsBookmark /> // Otherwise, render regular bookmark icon
								)}
							</div>
							<AiOutlineShareAlt onClick={handleShareBlog} />
						</div>
					</div>
					<div className='comment__flexbox'>
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
					<div className='blog__recent-post'>
						<div className='recent__postx-header'>
							<h4>MOST RECENT</h4>
							<RiArrowDropDownLine />
						</div>
						{blog.comments.map((comment, commentIndex) => (
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
															src={`https://api3.greeninkltd.com/${reply.image}`}
															alt='Reply'
														/>
														<div>
															<h6>{reply.name}</h6>
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
					</div>
				</div>
				<div>
					{randomBlogs.map(({ id, image, detail, title, owner, date }) => {
						const createdDate = new Date(date);
						const options = { month: "long", day: "numeric", year: "numeric" };
						const formattedDate = createdDate.toLocaleDateString(
							"en-US",
							options
						);
						return (
							<div className='blog__body__right' key={id}>
								<Link to={`/appblog/${id}`}>
									<img
										className='blog__body__right-img'
										src={image}
										alt='image'
									/>
									<h4>{title}</h4>
									<p>{truncateText(detail)}</p>
									<div className='blog__body__autor'>
										<img src={owner.image} alt='author' />
										<div>
											<p>{owner.name}</p>
											<small>{formattedDate}</small>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default BlogDetail;
