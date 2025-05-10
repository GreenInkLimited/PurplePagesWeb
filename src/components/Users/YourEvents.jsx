import React, { useEffect, useState } from "react";
import Sold from "../../assets/soldEvent.png";
import { getMyEvent } from "../../apis/EventsApis";

const YourEvents = () => {
	const [myEvent, setMyEvent] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMyEvents = async () => {
			try {
				const response = await getMyEvent({ pageParam: 0 });
				setMyEvent(response);
				setLoading(false);
			} catch (error) {
				console.log("Error fetching events:", error);
			}
		};
		fetchMyEvents();
	}, []);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toDateString();
	};

	const daysDifference = (fromDate) => {
		const today = new Date();
		const startDate = new Date(fromDate);
		const differenceInTime = startDate.getTime() - today.getTime();
		return Math.ceil(differenceInTime / (1000 * 3600 * 24));
	};

	return (
		<div>
			{myEvent.map(
				({
					id,
					event_flier,
					event_name,
					from_date,
					to_date,
					quantity_sold,
				}) => {
					const daysDifferenceValue = daysDifference(from_date);
					const eventHasEnded = daysDifferenceValue < 0;
					const eventMessage = eventHasEnded
						? `Ended ${Math.abs(daysDifferenceValue)} days ago`
						: `Starts in ${daysDifferenceValue} days time`;

					return (
						<div className='your__event-container' key={id}>
							<img
								className='your__event-container-img'
								src={`https://api3.greeninkltd.com/${event_flier}`}
								alt='logo'
							/>
							<div className='event__details'>
								<div className='event__details-top'>
									<h2>{event_name}</h2>
									{eventHasEnded ? (
										<small className='event__details-end'>{eventMessage}</small>
									) : (
										<small className='event__details-start'>
											{eventMessage}
										</small>
									)}
								</div>
								<div className='your__event-sold'>
									<img src={Sold} alt='sold' />
									<p>{quantity_sold}</p>
								</div>
							</div>
						</div>
					);
				}
			)}
		</div>
	);
};

export default YourEvents;
