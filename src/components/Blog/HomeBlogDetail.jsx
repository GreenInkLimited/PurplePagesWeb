import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	getBlogById,
	getBlogs,
	AddBlogComment,
	AddBlogLike,
} from "../../apis/BlogApis";
import { AddBlogWishlist } from "../../apis/WishlistApis";
import Logo from "../../assets/pplogo.png";

const MAX_DETAIL_LENGTH = 150;

const truncateText = (text) => {
	// Remove HTML tags from the text
	const plainText = text.replace(/<[^>]+>/g, "");

	if (plainText.length <= MAX_DETAIL_LENGTH) {
		return text;
	}

	return plainText.slice(0, MAX_DETAIL_LENGTH) + "...";
};

const convertLineBreaks = (text) => {
	return text.replace(/<br\s*\/?>/gm, "\n");
};

const HomeBlogDetail = () => {
	const { id } = useParams();
	const [blog, setBlog] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [isLiked, setIsLiked] = useState(false);

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
	const randomBlogs = shuffledBlogs.slice(0, 2);

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
						<p>{blog.owner.name}</p>
						<p className='smallx'>{formattedDate}</p>
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
								<Link to={`/blog/${id}`}>
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

export default HomeBlogDetail;
