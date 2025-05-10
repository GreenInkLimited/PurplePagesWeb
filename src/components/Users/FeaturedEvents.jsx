import React, { useEffect, useState } from "react";
import { categories, explore, trendingevents } from "../../data";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate"; // recommend
import Modal from "../Modals/Modal";
import { getAllEvents } from "../../apis/EventsApis";
import Logo from "../../assets/pplogo.png";
import { format, parseISO } from "date-fns";

const FeaturedEvents = () => {
	const [openModal, setOpenModal] = useState(false);
	const [event, setEvent] = useState([]);
	const [initialEvents, setInitialEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(null);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await getAllEvents();
				setEvent(response);
				setInitialEvents(response);
				setLoading(false);
			} catch (error) {
				console.log("Error fetching Events:", error);
			}
		};
		fetchEvent();
	}, []);

	const getDayOfWeek = (dateString) => {
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) {
				return "Unknown";
			}
			const dayOfWeek = format(date, "EEEE");
			return dayOfWeek;
		} catch (error) {
			console.error("Error parsing date:", error);
			return "Unknown";
		}
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='logo' />
			</div>
		);
	}

	const filteredEvents = selectedCategory
		? event.filter(
				(event) =>
					event.event_category.toLowerCase() === selectedCategory.toLowerCase()
		  )
		: event;

	return (
		<section className='events'>
			{openModal && <Modal closeModal={setOpenModal} />}
			<h3>Trending categories</h3>
			<div className='ftrending__events__container'>
				<div className='ftrending__events__wrapper-top'>
					{categories.map(({ id, icon, title, path }) => (
						<div
							className='events__valuexxx'
							key={id}
							onClick={() => setSelectedCategory(title)}
						>
							<img src={icon} alt='icon' />
							<p>{title}</p>
						</div>
					))}
				</div>
			</div>
			<div className='ftrending__events'>
				<h3>Trending Events</h3>
				<div className='ftrending__events__container'>
					<div className='ftrending__events__wrapper'>
						{filteredEvents.map(
							({
								id,
								event_location,
								event_name,
								days,
								event_flier,
								event_category,
								start_time,
								event_description,
								from_date,
								end_time,
							}) => (
								<div className='trending__events__value' key={id}>
									<img
										src={`https://api3.greeninkltd.com/${event_flier}`}
										alt='icon'
									/>
									<p className='category'>{event_category}</p>
									<h4 className='title'>
										<b>{event_name}</b>
									</h4>
									{start_time !== "null" && end_time !== "null" ? (
										<p className='date'>
											<MdOutlineDateRange />
											{from_date ? (
												<>
													{getDayOfWeek(from_date)}, {from_date} at {start_time}{" "}
													- {end_time}
												</>
											) : (
												<>
													{getDayOfWeek(from_date)}, {from_date} at {start_time}{" "}
													- {end_time}
												</>
											)}
										</p>
									) : (
										<p className='date'>
											<MdOutlineDateRange />
											{from_date ? (
												<>
													{getDayOfWeek(from_date)}, {from_date}
												</>
											) : (
												<>
													{getDayOfWeek(from_date)}, {from_date}
												</>
											)}
										</p>
									)}
									<p>{event_description}</p>
									<div className='link'>
										<Link className='btn' to={`/user-events/${id}`}>
											View Detail
										</Link>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</div>
			<div className='fexplore'>
				<h3>Explore By Category</h3>
				<div className='fexplore__container'>
					<div className='fexplore__wrapper'>
						{explore.map(({ id, icon, title }) => (
							<div className='fexplore__value' key={id}>
								<img src={icon} alt='icon' />
								<p>{title}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='host__event__container'>
				<h2>Ready to host your events?</h2>
				<Link className='link btn white' onClick={() => setOpenModal(true)}>
					Let’s Get Started
				</Link>
			</div>
		</section>
	);
};

export default FeaturedEvents;
