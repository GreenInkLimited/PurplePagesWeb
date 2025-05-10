import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { getMyBusinessById } from "../../apis/BusinessApi";
import Logo from "../../assets/pplogo.png";
import PromoteModal from "./PromoteModal";
import { RxDotFilled } from "react-icons/rx";

const UserProfile = () => {
	const { id } = useParams();
	const [business, setBusiness] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const modalRef = useRef(null);

	const fullStars = Math.floor(business?.rating);
	const hasHalfStar = business?.rating % 1 !== 0;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	useEffect(() => {
		const fetchBusiness = async () => {
			try {
				const businessData = await getMyBusinessById({ id });
				setBusiness(businessData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching business:", error);
			}
		};

		fetchBusiness();
	}, [id]);

	const handlePromotePage = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const handleClickOutsideModal = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setShowModal(false);
			}
		};

		document.addEventListener("click", handleClickOutsideModal);

		return () => {
			document.removeEventListener("click", handleClickOutsideModal);
		};
	}, []);

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Loading' />
			</div>
		);
	}

	return (
		<>
			<div className='user__header'>
				<div className='user__header__container'>
					<div className='user__header__container-bg'>
						<img
							src={`https://api3.greeninkltd.com/${business?.banner}`}
							alt='header bg'
						/>
					</div>
				</div>
			</div>

			<div className='userprofile__container'>
				<div className='userprofile__infor-wrapper'>
					<div className='userprofile__info-left'>
						<img
							className='userprofile__info-img'
							src={`https://api3.greeninkltd.com/${business?.image}`}
						/>
						<div className='userprofile__info_body'>
							<h3>{business?.name}</h3>
							<div className='userprofile__info_body-mobile'>
								<p className='userprofile__category'> {business?.category}</p>
								<RxDotFilled className='dot_filled' />
								<p> {business?.subscriptions.length} subscribers</p>
								<RxDotFilled className='dot_filled' />
								<p>
									{" "}
									{business?.location}, {business?.lga}
								</p>
							</div>
							<div className='rating'>
								{[...Array(fullStars)].map((_, index) => (
									<ImStarFull key={index} />
								))}
								{hasHalfStar && <ImStarHalf />}
								{[...Array(emptyStars)].map((_, index) => (
									<ImStarEmpty key={index} />
								))}
							</div>
						</div>
					</div>
					<div className='containerx'>
						<button className='subscribe' onClick={handlePromotePage}>
							Promote Page
						</button>
					</div>
				</div>
			</div>
			{showModal && (
				<PromoteModal
					onCloseModal={handleCloseModal}
					businessId={id}
					ref={modalRef}
				/>
			)}
		</>
	);
};

export default UserProfile;
