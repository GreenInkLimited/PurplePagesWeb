import React, { useState, useRef, useEffect } from "react";
import PostAdsModal from "./PostAdsModal";
import { getMyBusinessById } from "../../apis/BusinessApi";
import { useParams } from "react-router-dom";
import Logo from "../../assets/pplogo.png";
import { getMyAds } from "../../apis/AdsApis";

const AdsHistory = () => {
	const { id } = useParams();
	const [business, setBusiness] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const modalRef = useRef(null);
	const [myAds, setMyAds] = useState([]);

	const handlePromotePage = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

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

	useEffect(() => {
		const fetchMyAds = async () => {
			try {
				const response = await getMyAds({ pageParam: 0 });
				setMyAds(response);
				setLoading(false);
			} catch (error) {
				console.log("Error fetching Wishlists:", error);
			}
		};
		fetchMyAds();
	}, []);

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
		<section className='adshistory'>
			<div className='adshistory'>
				<div className='adshistory__header'>
					<h4>Adverts History</h4>
					<p onClick={handlePromotePage}>Post an ad</p>
				</div>
				<div className=' adshistory__wrapper'>
					{myAds.map(({ id, image, title }) => {
						return (
							<div className='adshistory__content' key={id}>
								<img
									src={`https://api3.greeninkltd.com/media/account_files/images/${image}`}
									alt={title}
								/>
								<p>{title}</p>
							</div>
						);
					})}
				</div>
			</div>
			{showModal && (
				<PostAdsModal
					onCloseModal={handleCloseModal}
					businessId={id}
					ref={modalRef}
				/>
			)}
		</section>
	);
};

export default AdsHistory;
