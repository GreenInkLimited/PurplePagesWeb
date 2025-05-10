import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import Header from "../../components/Header";
import { getBusinessById, SubscribeToBusiness } from "../../apis/BusinessApi";
import Logo from "../../assets/pplogo.png";
import { RxDotFilled } from "react-icons/rx";
import ImageModal from "./ImageModal";

const ProfileInfo = () => {
	const { id } = useParams();
	const [business, setBusiness] = useState(null);
	const [loading, setLoading] = useState(true);
	const [subscribed, setSubscribed] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchBusiness = async () => {
			try {
				const businessData = await getBusinessById({ id });
				setBusiness(businessData);
				setLoading(false);

				const auth_code = localStorage.getItem("auth_code");
				const isSubscribed = localStorage.getItem(
					`subscribed_${id}_${auth_code}`
				);
				setSubscribed(isSubscribed === "true");
			} catch (error) {
				console.error("Error fetching business:", error);
			}
		};

		fetchBusiness();
	}, [id]);

	const handleImageClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSubscribe = async () => {
		try {
			const auth_code = localStorage.getItem("auth_code");
			const isSubscribed = localStorage.getItem(
				`subscribed_${id}_${auth_code}`
			);

			if (isSubscribed === "true") {
				// User is already subscribed, so unsubscribe logic
				// Call the appropriate function to unsubscribe from the business
				// Update the subscribed state accordingly
				localStorage.setItem(`subscribed_${id}_${auth_code}`, "false");
				setSubscribed(false);
			} else {
				// User is not subscribed, so subscribe logic
				const response = await SubscribeToBusiness({ business_id: id });
				console.log(response);
				// Update the subscribed state to indicate successful subscription
				localStorage.setItem(`subscribed_${id}_${auth_code}`, "true");
				setSubscribed(true);
			}
		} catch (error) {
			console.error("Error subscribing to business:", error);
			// Handle error or display an error message to the user
		}
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Loading' />
			</div>
		);
	}

	// Calculate the average reviews rating
	const reviews = business?.reviews ?? [];
	const totalReviews = reviews.length;
	const sumRatings = reviews.reduce(
		(sum, review) => sum + Number(review.rating),
		0
	);
	const averageRating = totalReviews > 0 ? sumRatings / totalReviews : 0;

	// Calculate the number of full stars to display
	const fullStars = Math.floor(averageRating);
	// Calculate the number of half stars to display
	const hasHalfStar = averageRating % 1 !== 0;
	// Calculate the number of empty stars to display
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div>
			<Header
				title=''
				image={`https://api3.greeninkltd.com/${business.banner}`}
				style={{ width: "292px", height: "402px", objectFit: "cover" }}
			/>
			<div className='container profile__container'>
				<div className='profile__infor-wrapper'>
					<div className='profile__info-left'>
						<img
							className='profile__info-img'
							src={`https://api3.greeninkltd.com/${business.image}`}
							alt={business.name}
							onClick={handleImageClick}
						/>
						<div className='profile__info_body'>
							<Link to={`/business/${id}`}>
								<h3>{business.name}</h3>
							</Link>
							<div className='profile__info_body-detail'>
								<p className='profile__category'>{business.category}</p>
								<RxDotFilled className='show__dot-mobile' />
								<p>{business.subscriptions.length} subscribers</p>
								<RxDotFilled className='show__dot-mobile' />
								<p className='profile__location-lga'>
									{business.location}, {business.lga}
								</p>
							</div>
							<div className='rating'>
								{[...Array(fullStars)].map((_, index) => (
									<ImStarFull key={`full-${index}`} />
								))}
								{hasHalfStar && <ImStarHalf key='half' />}
								{[...Array(emptyStars)].map((_, index) => (
									<ImStarEmpty key={`empty-${index}`} />
								))}
							</div>
						</div>
					</div>
					<button
						className={`subscribe ${subscribed ? "subscribed" : ""}`}
						onClick={handleSubscribe}
						disabled={subscribed}
					>
						{subscribed ? "Subscribed" : "Subscribe"}
					</button>
				</div>
			</div>
			{showModal && (
				<ImageModal
					imageUrl={`https://api3.greeninkltd.com/${business.image}`}
					alt={business.name}
					onClose={handleCloseModal} // Add onClose handler to close the modal
				/>
			)}
		</div>
	);
};

export default ProfileInfo;
