import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyBusinessById, getMails } from "../../apis/BusinessApi";
import Sender from "../../assets/comment.png";
import Clip from "../../assets/emailclip.png";
import SendMailModal from "./SendMailModal";
import Logo from "../../assets/pplogo.png";
import UpdateMailModal from "./UpdateMailModal";

const EmailMarketing = () => {
	const { id } = useParams(); // Make sure to include curly braces around `useParams`
	const [business, setBusiness] = useState(null);
	const [mails, setMails] = useState(null);
	const [showEmailBody, setShowEmailBody] = useState(false);
	const [showAddProductModal, setShowAddProductModal] = useState(false);
	const [updateEmailModal, setUpdateEmailModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [expandedEmailIds, setExpandedEmailIds] = useState([]);

	useEffect(() => {
		const fetchBusiness = async () => {
			try {
				const businessData = await getMyBusinessById({ id });
				setBusiness(businessData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching bio:", error);
			}
		};

		fetchBusiness();
	}, [id]);

	useEffect(() => {
		const fetchMails = async () => {
			try {
				const businessId = id;
				const mailData = await getMails({ id: businessId });
				setMails(mailData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching mails:", error);
			}
		};

		fetchMails();
	}, [id]);

	const toggleEmailBody = (emailId) => {
		if (expandedEmailIds.includes(emailId)) {
			setExpandedEmailIds(expandedEmailIds.filter((id) => id !== emailId));
		} else {
			setExpandedEmailIds([...expandedEmailIds, emailId]);
		}
	};

	const openAddProductModal = () => {
		setShowAddProductModal(true);
	};

	const openUpdateEmailModal = () => {
		setUpdateEmailModal(true);
	};

	const closeAddProductModal = () => {
		setShowAddProductModal(false);
	};

	const closeUpdateEmailModal = () => {
		setUpdateEmailModal(false);
	};

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	if (loading) {
		return (
			<div className='spinner_container'>
				<img src={Logo} alt='Loading' />
			</div>
		);
	}

	return (
		<>
			<div className='email__marketing-container'>
				<div className='email__marketing-header'>
					{showAddProductModal && (
						<div className='add-product-modal'>
							<SendMailModal onCancel={closeAddProductModal} businessId={id} />
						</div>
					)}

					{updateEmailModal && (
						<div className='add-product-modal'>
							<UpdateMailModal
								onCancel={closeUpdateEmailModal}
								businessId={id}
							/>
						</div>
					)}

					<h3>Email History</h3>
					<button onClick={openModal} className='subscribe'>
						Send email
					</button>
					<button onClick={openUpdateEmailModal} className='subscribe'>
						update email
					</button>
				</div>

				{mails?.map(({ id, mail, file, subject, bundle, pub_date }) => (
					<div className='email__marketing-wrapper' key={id}>
						<div className='email__marketting-sender'>
							<div className='email__marketing-senderleft'>
								<img
									src={`https://api3.greeninkltd.com/${business?.image}`}
									alt='Sender'
								/>
								<div className='email__marketing-senderdetails'>
									<p>
										<b>{subject}</b>
									</p>
									<small>To {bundle}</small>
								</div>
							</div>
							<div className='email__marketing-senderright'>
								<p>
									{new Date(pub_date).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									})}
								</p>
							</div>
						</div>
						{expandedEmailIds.includes(id) ? (
							<>
								<div className='email__marketing-content'>
									<p>{mail}</p>
								</div>
								<div className='email__marketing-clip'>
									<img
										src={`https://api3.greeninkltd.com/${file}`}
										alt='Clip'
									/>
								</div>
								<div className='email__marketing-info'>
									<img
										src={`https://api3.greeninkltd.com/${business?.image}`}
										alt='Sender'
									/>
									<div className='email__marketing-senderdetails'>
										<p>{business?.name}</p>
										<p>{business?.category}</p>
										<p>{business?.phone}</p>
										<p>@{business?.app_user}</p>
										<p>
											{business?.address}, {business?.lga}
										</p>
									</div>
								</div>

								<div
									className='email__seeless'
									onClick={() => toggleEmailBody(id)}
								>
									<p>Show less</p>
								</div>
							</>
						) : (
							<div
								className='email__seeless'
								onClick={() => toggleEmailBody(id)}
							>
								<p>Show more</p>
							</div>
						)}
					</div>
				))}
			</div>

			{showModal && (
				<div className='add-product-modal'>
					<SendMailModal onCancel={closeModal} businessId={id} />
				</div>
			)}
		</>
	);
};

export default EmailMarketing;
