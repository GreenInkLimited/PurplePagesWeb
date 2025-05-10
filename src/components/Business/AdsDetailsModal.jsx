import React, { useEffect, useRef, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUser } from "../../apis";
import { AddAds, AddCategory } from "../../apis/AdsApis";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { PaystackButton } from "react-paystack";
import Flutterwave from "../../assets/Flutterwave.png";
import Paystack from "../../assets/Paystack.png";
import {
	RiArrowDownSLine,
	RiArrowUpSLine,
	RiImageAddLine,
} from "react-icons/ri";
import { AdsImageUpload } from "../../apis/AdsApis";

const AdsDetailsModal = ({ selectedPlan, onCloseModal, businessId }) => {
	const [image, setImage] = useState(null);
	const [fileName, setFileName] = useState("No File Selected");
	const [previewURL, setPreviewURL] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const [flutterwavePaymentStatus, setFlutterwavePaymentStatus] = useState("");
	const [paymentError, setPaymentError] = useState("");
	const [isActiveLocation, setIsActiveLocation] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState("");
	const [adsContent, setAdsContent] = useState([]);
	const modalRef = useRef(null); // Reference to the modal container
	const locationDropdownRef = useRef(null); // Reference to the location dropdown container
	const locations = [
		"Abia",
		"Adamawa",
		"Akwa Ibom",
		"Anambra",
		"Bauchi",
		"Bayelsa",
		"Benue",
		"Borno",
		"Cross River",
		"Delta",
		"Ebonyi",
		"Edo",
		"Ekiti",
		"Enugu",
		"FCT",
		"Gombe",
		"Imo",
		"Jigawa",
		"Kaduna",
		"Kano",
		"Katsina",
		"Kebbi",
		"Kogi",
		"Kwara",
		"Lagos",
		"Nasarawa",
		"Niger",
		"Ogun",
		"Ondo",
		"Osun",
		"Oyo",
		"Plateau",
		"Rivers",
		"Sokoto",
		"Taraba",
		"Yobe",
		"Zamfara",
	];

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				onCloseModal(); // Call the onCloseModal function to close the modal
			}
		};

		// Add event listener to the document
		document.addEventListener("mousedown", handleOutsideClick);

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [onCloseModal]);

	const handleCheckboxChange = (value) => {
		const category = { id: value, name: value }; // Assuming you have an id and name for each category
		if (adsContent.some((content) => content.id === category.id)) {
			setAdsContent((prevContent) =>
				prevContent.filter((content) => content.id !== category.id)
			);
		} else {
			setAdsContent((prevContent) => [...prevContent, category]);
		}
	};

	const handleLogoUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFileName(file.name);
			setImage(file);
			const previewURL = URL.createObjectURL(file);
			setPreviewURL(previewURL);
		}
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
	const { mutateAsync } = useMutation(
		"add ads",
		async (values) => {
			try {
				const adsResponse = await AddAds({
					ads_type: selectedPlan,
					title: values.title,
					price: selectedPlanDetails.price,
					plan: selectedPlanDetails.title,
					duration: values.duration,
					location: selectedLocation,
					detail: values.detail,
					f_status: values.f_status,
					i_status: values.i_status,
					t_status: values.t_status,
					business_id: businessId,
				});

				console.log("AddAds response:", adsResponse);

				if (adsResponse.status_lean) {
					const adsId = adsResponse.ads_id;

					// Upload the image if it's available
					if (image) {
						const imageResponse = await AdsImageUpload({
							ads_id: adsId,
							image: image,
							image_url: image,
						});

						console.log("AdsImageUpload response:", imageResponse);

						if (!imageResponse.status_lean) {
							throw new Error(imageResponse.detail);
						}
					}

					// Iterate over each selected category and make separate requests
					for (const category of adsContent) {
						const categoryResponse = await AddCategory({
							ads_id: adsId,
							category: category.name,
						});

						console.log("AddCategory response:", categoryResponse);

						if (!categoryResponse.status_lean) {
							throw new Error(categoryResponse.detail);
						}
					}

					navigate("/personal");
				} else {
					throw new Error(adsResponse.detail);
				}
			} catch (error) {
				console.error("Error:", error);
				throw error;
			}
		},
		{
			onError: (error) => {
				console.error("AddAds error:", error);
			},
		}
	);

	const userEmail = userInfo ? userInfo.email : "";

	const initialValues = {
		duration: "",
		location: "",
		title: "",
		detail: "",
		price: "",
		f_status: "False",
		i_status: "False",
		t_status: "False",

		business_id: businessId,
	};

	const validationSchema = Yup.object({
		duration: Yup.string().required("Duration is Required"),
		location: Yup.string().required("Location is Required"),
		title: Yup.string().required("Title is Required"),
		detail: Yup.string().required("Caption is Required"),
	});

	const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
	const [isFormSubmitting, setIsFormSubmitting] = useState(false);

	const handleSubmit = async (values) => {
		try {
			setIsFormSubmitting(true);
			await mutateAsync(values);
		} catch (error) {
			console.error("AddAds error:", error);
			// Handle error, e.g., show an error message
		} finally {
			setIsFormSubmitting(false);
		}
	};

	const handlePaymentSuccess = async (reference, values) => {
		setIsPaymentSuccessful(true);
		setPaymentStatus(`Payment successful. Reference: ${reference}`);
		// Perform any additional actions here, such as updating the UI or sending payment details to the server
		handleSubmit(values); // Submit the form after successful payment
	};

	//const handlePaymentFailure = (error) => {
	// console.error('Payment failed:', error);
	//};

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
				title: "Post Ads",
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
		<div className='plan-details-modal-containerxx' ref={modalRef}>
			<div className='plan-details-modal-header'>
				<BiLeftArrowAlt
					className='plan-details-modal-close'
					onClick={onCloseModal}
				/>
				<h2>Post Ads</h2>
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

			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<Form>
					<div className='create__business__row post__ads-header'>
						<div>
							<label>Business Location</label>
							<Field name='location'>
								{({ field }) => (
									<div className='dropdown'>
										<div
											className='dropdown-btn'
											onClick={() => setIsActiveLocation(!isActiveLocation)}
										>
											{selectedLocation || field.value || "Select"}
											<div className='dropdown-icons'>
												{isActiveLocation ? (
													<RiArrowUpSLine className='dropdown-icon' />
												) : (
													<RiArrowDownSLine className='dropdown-icon' />
												)}
											</div>
										</div>
										{isActiveLocation && (
											<div className='dropdown-content'>
												{locations.map((option) => (
													<div
														key={option}
														onClick={() => {
															setSelectedLocation(option);
															setIsActiveLocation(false);
															field.onChange({
																target: { value: option, name: "location" },
															});
														}}
														className='dropdown-item'
													>
														{option}
													</div>
												))}
											</div>
										)}
									</div>
								)}
							</Field>
						</div>
						<ErrorMessage
							name='location'
							component='small'
							className='error-message'
						/>
						<div>
							<label>Choose Duration</label>
							<Field
								className='input'
								type='text'
								name='duration'
								placeholder='If applicable'
							/>
							<ErrorMessage
								name='duration'
								component='small'
								className='error-message'
							/>
						</div>
					</div>
					<div className='post__ads-header'>
						<label>How would you categorize this advert? (required)</label>
					</div>
					<div className='post__ads-checkbox'>
						<div className='post__ads-wrapper'>
							<label>
								<Field
									type='checkbox'
									name='adsContent'
									value='Brand Ad'
									checked={adsContent.some(
										(content) => content.name === "Brand Ad"
									)}
									onChange={() => handleCheckboxChange("Brand Ad")}
								/>
								Brand Ad
							</label>
						</div>
						<div className='post__ads-wrapper'>
							<label>
								<Field
									type='checkbox'
									name='adsContent'
									value='Product Ad'
									checked={adsContent.some(
										(content) => content.name === "Product Ad"
									)}
									onChange={() => handleCheckboxChange("Product Ad")}
								/>
								Product Ad
							</label>
						</div>
						<div className='post__ads-wrapper'>
							<label>
								<Field
									type='checkbox'
									name='adsContent'
									value='Sales'
									checked={adsContent.some(
										(content) => content.name === "Sales"
									)}
									onChange={() => handleCheckboxChange("Sales")}
								/>
								Sales
							</label>
						</div>
						<div className='post__ads-wrapper'>
							<label>
								<Field
									type='checkbox'
									name='adsContent'
									value='Promo'
									checked={adsContent.some(
										(content) => content.name === "Promo"
									)}
									onChange={() => handleCheckboxChange("Promo")}
								/>
								Promo
							</label>
						</div>
						<div className='post__ads-wrapper'>
							<label>
								<Field
									type='checkbox'
									name='adsContent'
									value='Discount'
									checked={adsContent.some(
										(content) => content.name === "Discount"
									)}
									onChange={() => handleCheckboxChange("Discount")}
								/>
								Discount
							</label>
						</div>
						<div className='post__ads-wrapper'>
							<label>
								<Field
									type='checkbox'
									name='adsContent'
									value='Black Friday'
									checked={adsContent.some(
										(content) => content.name === "Black Friday"
									)}
									onChange={() => handleCheckboxChange("Black Friday")}
								/>
								Black Friday
							</label>
						</div>
						<div className='post__ads-wrapper'>
							<label>
								<Field
									type='checkbox'
									name='adsContent'
									value='Others'
									checked={adsContent.some(
										(content) => content.name === "Others"
									)}
									onChange={() => handleCheckboxChange("Others")}
								/>
								Others
							</label>
						</div>
					</div>
					<label>Upload your logo (optional)</label>
					<div
						className='upload__file-container'
						onClick={() => document.querySelector(".logo-input").click()}
					>
						<Field
							className='input-field logo-input'
							type='file'
							accept='image/jpeg, image/png'
							name='image'
							hidden
							onChange={handleLogoUpload}
						/>
						{previewURL ? (
							<img src={previewURL} alt={fileName} className='uploaded-image' />
						) : (
							<RiImageAddLine color='#EBB8FC' />
						)}
					</div>
					<small>Your image should be in JPEG or PNG format</small>
					<label>Advert Title</label>
					<Field
						className='input'
						type='text'
						name='title'
						placeholder='Enter title'
					/>
					<ErrorMessage
						name='title'
						component='small'
						className='error-message'
					/>

					<label>Advert Caption</label>
					<Field
						as='textarea'
						className='input'
						type='text'
						name='detail'
						placeholder='Your advert caption'
					/>
					<ErrorMessage
						name='detail'
						component='small'
						className='error-message'
					/>
					<div className='promote__button-containerxx'>
						<PaystackButton
							className='user_user__buttonxx'
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
							className='user_user__buttonxx'
							type='button'
							onClick={makeFlutterwavePayment}
						>
							Pay with <img src={Flutterwave} alt='logo' />
						</button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default AdsDetailsModal;
