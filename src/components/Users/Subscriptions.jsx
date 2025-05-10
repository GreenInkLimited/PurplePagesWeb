import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubcriptions } from "../../apis/BusinessApi";
import Logo from "../../assets/pplogo.png";
import { BsDot } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";

const MAX_DETAIL_LENGTH = 100;

const truncateText = (text) => {
	if (text.length <= MAX_DETAIL_LENGTH) {
		return text;
	}
	return text.slice(0, MAX_DETAIL_LENGTH) + "...";
};

const Subscriptions = () => {
	const [subscriptions, setSubscriptions] = useState([]);
	const [businesses, setBusinesses] = useState([]); // Changed the state variable name to 'businesses'
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSubscriptions = async () => {
			try {
				const response = await getSubcriptions({ pageParam: 0 });
				setSubscriptions(response.map((business) => business.products).flat());
				setBusinesses(response); // Store the entire 'response' array in 'businesses' state variable
				setLoading(false);
			} catch (error) {
				console.log("Error fetching Subscriptions:", error);
			}
		};
		fetchSubscriptions();
	}, []);

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='logo' />
			</div>
		);
	}
	return (
		<>
			<div className='subscribed_business-mobile'>
				{businesses.map((business) => (
					<div className='subscribed_business-mobile-notification'>
						<img
							className='blog__value___bodies-img'
							src={`https://api3.greeninkltd.com/${business.image}`}
							alt='author'
						/>
						<BsDot className='bsdot' />
					</div>
				))}
				<div className='RiArrowRightSLine'>
					<RiArrowRightSLine />
				</div>
			</div>
			<div className='subscription__row'>
				{businesses.map((business) => (
					<>
						{business.blogs.map((blog) => {
							const createdDate = new Date(blog.pub_date);
							const options = {
								month: "long",
								day: "numeric",
								year: "numeric",
							};
							const formattedDate = createdDate.toLocaleDateString(
								"en-US",
								options
							);
							return (
								<div className='subscription__sub' key={business.id}>
									<div className='subscription__container-sub' key={blog.id}>
										<div className='subscription__wrapper-sub sub_for-blogs'>
											<div className='subscription__value-sub'>
												<img
													className='subscription__value-img-sub'
													src={`https://api3.greeninkltd.com/${blog.image}`}
													alt='icon'
												/>
												<Link to={`/appblog/${blog.id}`}>
													<h2>{blog.title}</h2>
												</Link>
												<p>{truncateText(blog.detail)}</p>
												<div className='blog__bottom'>
													<img
														className='blog__value___bodies-img'
														src={`https://api3.greeninkltd.com/${business.image}`}
														alt='author'
													/>
													<div className='blog__bottom-detail'>
														<p>{business.name}</p>
														<small>{formattedDate}</small>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</>
				))}
				{subscriptions.map(({ id, caption, image, price }) => (
					<div className='subscription__container-sub' key={id}>
						<div className='subscription__wrapper-sub sub_for-blogs'>
							<div className='subscription__value-sub'>
								<img
									className='subscription__value-img-sub'
									src={`https://api3.greeninkltd.com/${image}`}
									alt='icon'
								/>
								<Link to={`/appblog/${id}`}>
									<small>{caption}</small>
								</Link>
								<p>{price}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Subscriptions;
