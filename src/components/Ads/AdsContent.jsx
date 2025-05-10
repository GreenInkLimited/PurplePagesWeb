import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAds } from "../../apis/AdsApis";
import Logo from "../../assets/pplogo.png";

const AdsContent = ({ searchQuery, searchResults, filteredResults }) => {
	const [adverts, setAdverts] = useState([]);
	const [showCount, setShowCount] = useState(8);
	const [loading, setLoading] = useState(true);

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

	const handleLoadMore = () => {
		setShowCount((prevCount) => prevCount + 8);
	};

	const adsToDisplay = searchQuery
		? searchResults
		: filteredResults.length > 0
		? filteredResults
		: adverts;

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='logo' />
			</div>
		);
	}

	return (
		<div className='ads container'>
			<div className='ads__container'>
				<div className='ads__wrapper'>
					{adsToDisplay
						.slice(0, showCount)
						.map(({ id, title, image, owner, ads_type }) => {
							const adType = ads_type;

							let adLink = "";
							if (adType === "blog") {
								adLink = `/appblog/${id}`;
							} else if (adType === "business") {
								adLink = `/business/${id}`;
							} else if (adType === "brand") {
								adLink = `/ads/${id}`;
							} else if (adType === "product") {
								adLink = `/singleproduct/${id}`;
							}

							return (
								<div key={id}>
									<div className='ads__value'>
										<Link to={adLink}>
											{ads_type === "brand" ? (
												<img
													className='ads__value-img'
													src={`https://api3.greeninkltd.com/media/account_files/images/${image}`}
													alt='icon'
												/>
											) : (
												<img
													className='ads__value-img'
													src={`https://api3.greeninkltd.com/${owner.image}`}
													alt='icon'
												/>
											)}
										</Link>
										<div className='ads__bottom'>
											<Link to={`business/${owner.id}`}>
												{owner && owner.image && (
													<img
														src={`https://api3.greeninkltd.com/${owner.image}`}
														alt='autor'
													/>
												)}
											</Link>
											<div className='ads__bottom-detail-flex'>
												<div className='ads__bottom-detail'>
													<Link to={adLink}>
														<h3>{title}</h3>
													</Link>
													<Link to={`business/${owner.id}`}>
														{owner && owner.name && <p>{owner.name}</p>}
													</Link>
												</div>
												<Link to={adLink}>
													<p className='ads_category'>{ads_type}</p>
												</Link>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
			{showCount < adverts.length && (
				<div className='product__load-more'>
					<button onClick={handleLoadMore}>Load More....</button>
				</div>
			)}
		</div>
	);
};

export default AdsContent;
