import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { Link, useParams } from "react-router-dom";
import { trendingevents } from "../../data";
import "./events.css";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modals/Modal";
import { getEventById } from "../../apis/EventsApis";
import icon from "../../assets/fashion.png";
import Logo from "../../assets/pplogo.png";
import { RiCalendarEventLine, RiTimeLine } from "react-icons/ri";
import { TiLocationOutline } from "react-icons/ti";
import { format, parseISO } from "date-fns";
import AdsbannerModal from "../../components/Modals/AdsBannerModal";

const convertLineBreaks = (text) => {
	return text.replace(/<br\s*\/?>/gm, "\n");
};

const EventDetails = () => {
	const [openModal, setOpenModal] = useState(false);
	const { id } = useParams();
	const event = trendingevents.find((event) => event.id === parseInt(id));
	const [events, setEvents] = useState(null);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);

	const handleImageClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const eventData = await getEventById(id);
				setEvents(eventData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching event:", error);
			}
		};

		fetchEvent();
	}, [id]);

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='logo' />
			</div>
		);
	}

	const formatDate = (dateString) => {
		const options = { day: "numeric", month: "long", year: "numeric" };
		const date = new Date(dateString);
		const day = date.getDate();
		let daySuffix = "th";
		if (day === 1 || day === 21 || day === 31) {
			daySuffix = "st";
		} else if (day === 2 || day === 22) {
			daySuffix = "nd";
		} else if (day === 3 || day === 23) {
			daySuffix = "rd";
		}
		const formattedDate = date.toLocaleDateString(undefined, {
			month: "long",
			year: "numeric",
		});
		return `${day}${daySuffix} of ${formattedDate}`;
	};

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

	return (
		<>
			{openModal && <Modal closeModal={setOpenModal} />}

			<Navbar />
			{events && (
				<header className='myevent__header'>
					<div className='myevent__header__container'>
						<div className='myevent__header__container-bg'>
							<img
								src={`https://api3.greeninkltd.com/${events.event_flier}`}
								alt='header bg'
								onClick={handleImageClick}
							/>
						</div>
					</div>
				</header>
			)}
			<section className='event__detail'>
				<div className='container'>
					<div className='event__detail-content'>
						<div className='event__detail-left'>
							{events && (
								<>
									<h2>{events.event_name}</h2>
									{events.from_date && events.to_date ? (
										<div className='event_gen-info'>
											<RiCalendarEventLine />
											<p className='date'>
												{formatDate(events.from_date)} to{" "}
												{formatDate(events.to_date)}
											</p>
										</div>
									) : (
										<div className='event_gen-info'>
											<RiCalendarEventLine />
											<p className='date'>
												{events.days ? (
													<>
														{events.days} - {getDayOfWeek(events.end_date)} -{" "}
														{formatDate(events.end_date)}
													</>
												) : (
													<>
														{getDayOfWeek(events.end_date)} -{" "}
														{formatDate(events.end_date)}
													</>
												)}
											</p>
										</div>
									)}

									{events.start_time !== "null" &&
									events.end_time !== "null" ? (
										<div className='event_gen-info'>
											<RiTimeLine />
											<p className='date'>
												{events.start_time} - {events.end_time}
											</p>
										</div>
									) : (
										<></>
									)}

									<div className='event_gen-info'>
										<TiLocationOutline />
										<p className='date'>{events.event_location}</p>
									</div>
								</>
							)}
						</div>
						<div className='event__detail-right'>
							{events && (
								<>
									{events.ticket_type === "Free" ? (
										<h3 className='detail'>Free</h3>
									) : (
										<h3 className='detail'>
											<span className='naira_font'>₦</span>
											{events.ticket_price}
										</h3>
									)}
									{events.ticket_type === "Free" ? (
										<Link
											onClick={() => {
												setOpenModal(true);
											}}
											className='btn fill'
										>
											Register
										</Link>
									) : (
										<Link
											onClick={() => {
												setOpenModal(true);
											}}
											className='btn fill'
										>
											Buy Ticket
										</Link>
									)}
								</>
							)}
						</div>
					</div>
					<div className='event__detail-desc'>
						<p>Description</p>
						{events && (
							<pre
								className='preformatted'
								style={{
									width: "100%",
									whiteSpace: "pre-wrap",
								}}
								dangerouslySetInnerHTML={{
									__html: convertLineBreaks(events.event_description),
								}}
							/>
						)}
					</div>

					<div className='events__container'>
						<p className='event__categories'>Category</p>

						<div className='events__wrapper'>
							{events && (
								<div className='events-details__value' key={id}>
									<img src={icon} alt='Category Icon' />
									<p>{events.event_category}</p>
								</div>
							)}
						</div>
					</div>
					{showModal && (
						<AdsbannerModal
							imageUrl={`https://api3.greeninkltd.com/${events.event_flier}`}
							onClose={handleCloseModal}
						/>
					)}
				</div>
			</section>
			<Footer />
		</>
	);
};

export default EventDetails;
