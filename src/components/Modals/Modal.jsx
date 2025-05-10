import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./modal.css";
import { getEventById, BuyTicket } from "../../apis/EventsApis";
import { useMutation } from "react-query";
import { PaystackButton } from "react-paystack";
import { v4 as uuidv4 } from "uuid";
import Paystack from "../../assets/Paystack.png";
import Flutterwave from "../../assets/Flutterwave.png";
import * as Yup from "yup";

const Modal = ({ closeModal }) => {
	const { id } = useParams();
	const [events, setEvents] = useState(null);
	const [loading, setLoading] = useState(true);
	const [ticketCount, setTicketCount] = useState(1); // State for the number of tickets
	const [paymentError, setPaymentError] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [flutterwavePaymentStatus, setFlutterwavePaymentStatus] = useState("");
	const modalRef = useRef(null); // Reference to the modal element

	const handleClickOutsideModal = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			closeModal(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideModal);

		return () => {
			document.removeEventListener("mousedown", handleClickOutsideModal);
		};
	}, []);

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

	// Function to handle increasing the ticket count
	const increaseTicketCount = () => {
		setTicketCount((prevCount) => prevCount + 1);
	};

	// Function to handle decreasing the ticket count
	const decreaseTicketCount = () => {
		if (ticketCount > 1) {
			setTicketCount((prevCount) => prevCount - 1);
		}
	};

	const initialValues = {
		quantity: "",
		first_name: "",
		last_name: "",
		email: "",
		id: id,
	};

	const { mutateAsync, isLoading } = useMutation("buy ticket", BuyTicket, {
		onSuccess: () => {
			closeModal();
		},
		onError: (error) => {
			console.error("Failed to buy ticket:", error);
		},
	});

	const validationSchema = Yup.object({
		first_name: Yup.string().required("First Name is Required"),
		last_name: Yup.string().required("Last Name is Required"),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
	});

	const paystackPublicKey = "pk_test_28e2ccbe1c4ec534a4472dbf969a7ea9469a967c";

	const handlePaymentSuccess = async (reference, values) => {
		// Handle successful payment
		setPaymentStatus(`Payment successful. Reference: ${reference}`);
		// You can perform any additional actions here, such as updating the UI or sending a confirmation email
	};

	const handlePaymentError = (error) => {
		// Handle payment error
		setPaymentStatus("error");
		setPaymentError(error.message);
	};

	const handlePaymentClose = () => {
		// Handle payment close
		setPaymentStatus("closed");
	};

	const handleSubmit = (values) => {
		const { first_name, last_name, email, id } = values;
		const updatedValues = {
			quantity: ticketCount, // Include the ticketCount value
			first_name,
			last_name,
			email: userEmail, // Use the userEmail state value
			id,
		};
		mutateAsync(updatedValues);
	};

	const [userEmail, setUserEmail] = useState("");

	const makeFlutterwavePayment = () => {
		const payload = {
			public_key: "FLWPUBK_TEST-af7baca9a5891ab36642c5e52fb6db61-X",
			tx_ref: `event${id}_${Date.now()}`,
			amount: parseInt(events.ticket_price * ticketCount + 40),
			currency: "NGN",
			payment_options: "card",
			customer: {
				email: userEmail,
			},
			customizations: {
				title: "Buy Ticket",
				description: `Payment for ${events.event_name}`,
				logo: "https://api3.greeninkltd.com/images/fav2.png", // Replace with your business logo URL
			},
			callback: function (response) {
				if (response.status === "successful") {
					setFlutterwavePaymentStatus("Payment successful");
					// Perform any additional actions here, such as updating the UI or sending payment details to the server
					handlePaymentSuccess(response.reference, initialValues);
				} else {
					setPaymentError("Payment failed");
					// Handle the payment failure scenario, e.g., display an error message
				}
			},
			onClose: function () {
				setFlutterwavePaymentStatus("Payment cancelled.");
			},
		};

		window.FlutterwaveCheckout(payload);
	};

	return (
		<div className='modal__background'>
			{events && (
				<div className='modal__container' ref={modalRef}>
					<div className='modal__header'>
						<div className='modal__title'>
							<img
								src={`https://api3.greeninkltd.com/${events.event_flier}`}
								alt='Event Flier'
							/>
							<div className='model__text'>
								<h4>{events.event_name}</h4>
								<p>
									{events.days} | {events.start_time} - {events.end_time}
								</p>
								<small>{events.event_location}</small>
							</div>
						</div>
						<AiOutlineClose
							className='close__my-modal__mobile'
							onClick={() => closeModal(false)}
						/>
						<AiOutlineClose
							className='close__my-modal'
							onClick={() => closeModal(false)}
						/>
					</div>
					<h2>Ticket Information</h2>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						<Form>
							<div className='modal__body'>
								<div className='modal__body-left'>
									<p>How many tickets do you want to buy</p>
									<div className='modal__inrease-desrease'>
										<div
											className='modal__decreament'
											onClick={decreaseTicketCount}
										>
											<AiOutlineMinus />
										</div>
										<p>{ticketCount}</p>
										<div
											className='modal__increament'
											onClick={increaseTicketCount}
										>
											<AiOutlinePlus />
										</div>
									</div>
									<div className='subtotal_update'>
										<p>
											Subtotal: <span className='naira_font'>₦</span>
											{events.ticket_price * ticketCount}
										</p>
									</div>
									<div>
										<label className='label'>
											First Name <small>(required)</small>
										</label>
										<Field
											className='modal__input'
											type='text'
											name='first_name'
											placeholder='Enter your first name'
										/>
										<ErrorMessage
											name='first_name'
											component='small'
											className='error-message'
										/>
									</div>
									<div>
										<label className='label'>
											Last Name <small>(required)</small>
										</label>
										<Field
											className='modal__input'
											type='text'
											name='last_name'
											placeholder='Enter your last name'
										/>
										<ErrorMessage
											name='last_name'
											component='small'
											className='error-message'
										/>
									</div>
									<label className='label'>
										Email <small>(required)</small>
									</label>
									<Field
										className='modal__input'
										type='email'
										name='email'
										placeholder='Enter your email'
										value={userEmail}
										onChange={(e) => setUserEmail(e.target.value)}
									/>
									<ErrorMessage
										name='email'
										component='small'
										className='error-message'
									/>
								</div>
								<div className='modal__xbody-left'>
									<h4>Summary</h4>
									<p>
										{ticketCount} x {events.event_name}
									</p>
									<div className='modal__payment-sumary'>
										<div className='modal__payment-info'>
											<div className='modal_subtotal'>
												<p>Sub-total</p>
												<p>
													<span className='naira_font'>₦</span>
													{events.ticket_price * ticketCount}
												</p>
											</div>
											<div className='modal_subtotal'>
												<p>Service charge</p>
												<p>
													<span className='naira_font'>₦</span>40
												</p>
											</div>
										</div>
									</div>
									<hr />
									<div className='modal__total'>
										<p>Total</p>
										<p className='total__madal-price'>
											<b>
												<span className='naira_font'>₦</span>
												{events.ticket_price * ticketCount + 40}
											</b>
										</p>
									</div>
								</div>
							</div>
							<div className='promote__button-containerxx'>
								<PaystackButton
									className='user_user__buttonxx'
									callback={handlePaymentSuccess}
									close={handlePaymentClose}
									disabled={isLoading}
									embed={false}
									reference={`paystack-modal-${id}-${uuidv4()}`}
									email={userEmail}
									amount={(events.ticket_price * ticketCount + 40) * 100}
									publicKey={paystackPublicKey}
									tag='button'
									loading={isLoading}
									onError={handlePaymentError}
								>
									<span>Pay with</span>
									<img src={Paystack} alt='Paystack Logo' />
								</PaystackButton>

								<button
									className='user_user__buttonxx'
									type='button'
									onClick={makeFlutterwavePayment}
								>
									Pay with <img src={Flutterwave} />
								</button>
							</div>
						</Form>
					</Formik>
					{paymentStatus === "success" && (
						<div className='payment-success'>
							<p>Payment successful!</p>
						</div>
					)}

					{paymentStatus === "error" && (
						<div className='payment-error'>
							<p>Payment error: {paymentError}</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Modal;
