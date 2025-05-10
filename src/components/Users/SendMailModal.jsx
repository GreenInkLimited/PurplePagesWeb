import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdClear } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { SendMail } from "../../apis/BusinessApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import BundleSelectionModal from "./BundleSelectionModal";
import { PaystackButton } from "react-paystack";
import Paystack from "../../assets/Paystack.png";
import Flutterwave from "../../assets/Flutterwave.png";
import { getUser } from "../../apis";
import * as Yup from "yup";

const SendMailModal = ({ onCancel, businessId }) => {
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No File Selected");
	const [previewURL, setPreviewURL] = useState(null);
	const [selectedBundle, setSelectedBundle] = useState(null);
	const [showBundleModal, setShowBundleModal] = useState(false);
	const [submitting, setSubmitting] = useState(false); // State to track form submission
	const [verificationError, setVerificationError] = useState("");
	const [flutterwavePaymentStatus, setFlutterwavePaymentStatus] = useState("");
	const [paymentError, setPaymentError] = useState("");
	const [userInfo, setUserInfo] = useState(null);

	const modalRef = useRef(null); // Reference to the modal element

	const handleCancel = () => {
		onCancel();
	};

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://checkout.flutterwave.com/v3.js";
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

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

	const navigate = useNavigate();
	const [paymentStatus, setPaymentStatus] = useState("");
	const paystackPublicKey = "pk_test_28e2ccbe1c4ec534a4472dbf969a7ea9469a967c";
	const { mutateAsync } = useMutation("send mail", SendMail, {
		onSuccess: (data) => {
			if (data && data.status_lean) {
				// Verification successful
				openPaymentFlow();
			} else {
				// Verification unsuccessful
				setVerificationError("Something is wrong");
				// You can perform any additional actions here, such as showing an error message
			}
		},
	});

	const userEmail = userInfo ? userInfo.email : "";

	useEffect(() => {
		if (submitting) {
			// Submit the form after selecting the bundle
			handleSubmit();
		}
	}, [submitting]);

	const handleLogoUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFileName(file.name);
			setImage(file);
			const previewURL = URL.createObjectURL(file);
			setPreviewURL(previewURL);
		}
	};

	const initialValues = {
		subject: "",
		mail: "",
	};

	const validationSchema = Yup.object({
		subject: Yup.string().required("Subject is Required"),
		mail: Yup.string().required("Mail Content is Required"),
	});

	const handleSubmit = async (values) => {
		if (selectedBundle) {
			const updatedValues = {
				subject: values.subject,
				mail: values.mail,
				file: image,
				price: selectedBundle.price,
				bundle: selectedBundle.bundle,
				business_id: businessId,
			};

			try {
				await mutateAsync(updatedValues);
				navigate("/personal");
			} catch (error) {
				console.error("Error sending mail:", error);
				// Handle error
			}
		} else {
			// Handle bundle not selected error
		}
	};

	const handlePaymentSuccess = async (reference, values) => {
		setPaymentStatus(`Payment successful. Reference: ${reference}`);
		// Perform any additional actions here, such as updating the UI or sending payment details to the server

		try {
			// ...
		} catch (error) {
			// ...
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
			amount: parseInt(selectedBundle.price),
			currency: "NGN",
			payment_options: "card",
			customer: {
				email: userEmail,
			},
			customizations: {
				title: "Post Mail",
				description: `Payment for Email Marketing`,
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

	const handleOpenBundleModal = () => {
		setShowBundleModal(true);
	};

	const handleCloseBundleModal = () => {
		setShowBundleModal(false);
	};

	const handleBundleSelect = (bundle) => {
		setSelectedBundle(bundle);
		setShowBundleModal(false);
		// Initiate form submission after selecting the bundle
		setSubmitting(true);
	};

	const handleClickOutsideModal = (event) => {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			handleCancel();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideModal);

		return () => {
			document.removeEventListener("mousedown", handleClickOutsideModal);
		};
	}, []);

	const openPaymentFlow = () => {
		// Perform necessary steps to open Paystack payment
		// Redirect the user to the Paystack payment page or show a payment modal
		// You'll need to integrate with Paystack's API and use their payment flow

		// Example code for redirection
		navigate("/paystack-payment"); // Redirect to the Paystack payment page
	};

	return (
		<div className='container'>
			<div className='create__business-container' ref={modalRef}>
				<div className='create__business-header'>
					<MdClear onClick={handleCancel} />
					<div className='create__business-detail'>
						<h4>Send mail to subscribers</h4>
					</div>
				</div>
				<p className='send__mail-gist'>Send email to your subscribers</p>
				<div className='create__business-body'>
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						<Form>
							<label>Subject of mail</label>
							<Field
								className='input'
								type='text'
								name='subject'
								placeholder='Enter discount'
							/>
							<ErrorMessage
								name='subject'
								component='small'
								className='error-message'
							/>

							<label>Content of mail</label>
							<Field
								as='textarea'
								className='textareax'
								name='mail'
								placeholder='Enter caption'
							/>
							<ErrorMessage
								name='mail'
								component='small'
								className='error-message'
							/>

							<label>Upload your photo(s)/video</label>
							<div
								className='upload__file-container'
								onClick={() => document.querySelector(".logo-input").click()}
							>
								<input
									type='file'
									accept='image/*, video/*'
									style={{ display: "none" }}
									className='logo-input'
									onChange={handleLogoUpload}
								/>
								{previewURL ? (
									<img
										src={previewURL}
										alt={fileName}
										className='uploaded-image'
									/>
								) : (
									<RiImageAddLine color='#EBB8FC' />
								)}
							</div>

							<div className='create__binex-button'>
								{selectedBundle ? (
									<div className='selected-bundle'>
										<h2>Selected Bundle:</h2>
										<p>bundle: {selectedBundle.bundle}</p>
										<p>bundle price: {selectedBundle.price}</p>
										<div className='send__mail-paymentintegrations'>
											<PaystackButton
												className='user_user__button'
												publicKey={paystackPublicKey}
												amount={
													selectedBundle && selectedBundle.price !== null
														? parseInt(selectedBundle.price) * 100
														: 0
												}
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
												Pay with{" "}
												<img src={Flutterwave} alt='Flutterwave Logo' />
											</button>
										</div>
									</div>
								) : (
									<button
										className='user_user__button'
										type='button'
										onClick={handleOpenBundleModal}
									>
										Select Bundle
									</button>
								)}
							</div>
						</Form>
					</Formik>
				</div>
			</div>
			{showBundleModal && (
				<BundleSelectionModal
					onCancel={handleCloseBundleModal}
					onBundleSelect={handleBundleSelect}
					businessId={businessId}
				/>
			)}
		</div>
	);
};

export default SendMailModal;
