import React, { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PromoteBusiness } from "../../apis/BusinessApi";
import { getUser } from "../../apis";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { PaystackButton } from "react-paystack";
import Flutterwave from "../../assets/Flutterwave.png";
import Paystack from "../../assets/Paystack.png";

const PlanDetailsModal = ({ selectedPlan, onCloseModal, businessId }) => {
	const [verificationError, setVerificationError] = useState("");
	const [userInfo, setUserInfo] = useState(null);
	const [flutterwavePaymentStatus, setFlutterwavePaymentStatus] = useState("");
	const [paymentError, setPaymentError] = useState("");

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.flutterwave.com/v3.js";
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);
	const planDetails = {
		daily: {
			title: "Daily Plan",
			price: "400",
			duration: "Daily",
			plans: "Basic",
		},
		daily_premium: {
			title: "Daily Plan",
			price: "700",
			duration: "Daily",
			plans: "Premium",
		},
		weekly: {
			title: "Weekly Plan",
			price: "2500",
			duration: "Weekly",
			plans: "Basic",
		},
		weekly_premium: {
			title: "Weekly Plan",
			price: "4000",
			duration: "Weekly",
			plans: "Premium",
		},
		monthly: {
			title: "Monthly Plan",
			price: "8000",
			plans: "Basic",
		},
		monthly_premium: {
			title: "Premium Plan",
			price: "14000",
			duration: "Daily",
			plans: "Premium",
		},
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await getUser({ pageParam: 0 });
				setUserInfo(response);
			} catch (error) {
				console.log("Error fetching User:", error);
			}
		};
		fetchUser();
	}, []);

	const selectedPlanDetails = planDetails[selectedPlan];
	const navigate = useNavigate();
	const [paymentStatus, setPaymentStatus] = useState("");
	const paystackPublicKey = "pk_test_28e2ccbe1c4ec534a4472dbf969a7ea9469a967c";
	const { isLoading, error, isError, mutateAsync, data } = useMutation(
		"promote business",
		PromoteBusiness,
		{
			onSuccess: (data) => {
				if (data && data.status_lean) {
					// Verification successful
					navigate("/personal");
				} else {
					// Verification unsuccessful
					setVerificationError("Something is wrong");
					// You can perform any additional actions here, such as showing an error message
				}
			},
		}
	);

	const userEmail = userInfo ? userInfo.email : "";

	const initialValues = {
		duration: "",
		location: "",
		business_id: businessId,
	};

	const handleSubmit = async (values) => {};

	console.log("businessId:", businessId);

	const handlePaymentSuccess = async (reference, values) => {
		setPaymentStatus(`Payment successful. Reference: ${reference}`);
		// Perform any additional actions here, such as updating the UI or sending payment details to the server

		try {
			const response = await PromoteBusiness({
				ads_type: selectedPlan,
				price: selectedPlanDetails.price,
				plan: selectedPlanDetails.title,
				duration: values.duration,
				location: values.location,
				business_id: businessId,
			});

			console.log("PromoteBusiness response:", response);
			// Handle success, e.g., show a success message
		} catch (error) {
			console.error("PromoteBusiness error:", error);
			// Handle error, e.g., show an error message
		}
	};

	const handlePaymentFailure = (error) => {
		console.error("Payment failed:", error);
		// Handle the payment failure scenario, e.g., display an error message
	};

	const makeFlutterwavePayment = () => {
		const payload = {
			public_key: "FLWPUBK_TEST-af7baca9a5891ab36642c5e52fb6db61-X",
			tx_ref: `business_${businessId}_${Date.now()}`,
			amount: parseInt(selectedPlanDetails.price),
			currency: "NGN",
			payment_options: "card",
			customer: {
				email: userEmail,
			},
			customizations: {
				title: "Promote Business",
				description: `Payment for ${selectedPlanDetails.title}`,
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
		<div className='plan-details-modal-container'>
			<div className='plan-details-modal-header'>
				<BiLeftArrowAlt
					className='plan-details-modal-close'
					onClick={onCloseModal}
				/>
				<h2>Promote Business</h2>
			</div>
			<div className='plan-details-modal-wrapper'>
				<p>
					Duration: <span>{selectedPlanDetails.title}</span>
				</p>
				<p>
					Plan: <span>{selectedPlanDetails.plans}</span>
				</p>
				<p>
					Price:{" "}
					<span>
						{selectedPlanDetails.price} / {selectedPlanDetails.duration}
					</span>
				</p>
			</div>

			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				<Form>
					<label>Choose Location</label>
					<Field
						className='input'
						type='text'
						name='location'
						placeholder='Enter location'
					/>
					<label>Choose Duration</label>
					<Field
						className='input'
						type='text'
						name='duration'
						placeholder='Enter duration'
					/>
					<div className='promote__button-container'>
						<PaystackButton
							className='user_user__button'
							publicKey={paystackPublicKey}
							amount={parseInt(selectedPlanDetails.price) * 100}
							currency='NGN'
							reference={`business_${businessId}_${Date.now()}`}
							email={userEmail}
							onSuccess={(reference) =>
								handlePaymentSuccess(reference, initialValues)
							}
							onClose={() => setPaymentStatus("Payment cancelled.")}
						>
							<span>Pay with</span>
							<img src={Paystack} alt='Paystack Logo' />
						</PaystackButton>

						<button
							className='user_user__button'
							type='button'
							onClick={makeFlutterwavePayment}
						>
							Pay with <img src={Flutterwave} />
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default PlanDetailsModal;
