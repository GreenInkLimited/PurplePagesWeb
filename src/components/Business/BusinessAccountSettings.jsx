import React, { useEffect, useState } from "react";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import AddAdminModal from "./AddAdminModal";
import { getAdmin, RevokeAccess } from "../../apis/BusinessApi";
import { useParams } from "react-router-dom";

const BusinessAccountSetting = () => {
	const { id } = useParams();
	const [business, setBusiness] = useState([]);
	const [isAddingAdmin, setIsAddingAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const [admins, setAdmins] = useState([]);

	const [subscriptionsEnabled, setSubscriptionsEnabled] = useState(true);
	const [businessSettingsEnabled, setBusinessSettingsEnabled] = useState(true);
	const [repliesToCommentsEnabled, setRepliesToCommentsEnabled] =
		useState(true);
	const [repliesToCommentsEnabledPush, setRepliesToCommentsEnabledPush] =
		useState(true);

	const [pushNotificationEnabled, setPushNotificationEnabled] = useState(true);
	const [emailNotificationEnabled, setEmailNotificationEnabled] =
		useState(true);

	const handlePushNotificationChange = () => {
		setPushNotificationEnabled(!pushNotificationEnabled);
	};

	const handleEmailNotificationChange = () => {
		setEmailNotificationEnabled(!emailNotificationEnabled);
	};

	const handleAddAdminClick = () => {
		setIsAddingAdmin(true);
	};

	const handleCloseModal = () => {
		setIsAddingAdmin(false);
	};

	useEffect(() => {
		const fetchBusiness = async () => {
			try {
				const adminsData = await getAdmin(id.toString());
				setAdmins(adminsData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching admins:", error);
			}
		};

		fetchBusiness();
	}, [id]);

	const handleAdminAdded = async (admin) => {
		try {
			const adminsData = await getAdmin(id.toString());
			setAdmins(adminsData);
		} catch (error) {
			console.error("Error fetching admins:", error);
			// Handle the error, show an error message, etc.
		}
	};

	const handleDeleteAdmin = async (businessId, username) => {
		try {
			await RevokeAccess({ business_id: businessId, username });
			setAdmins((prevAdmins) =>
				prevAdmins.filter((admin) => admin.username !== username)
			);
		} catch (error) {
			console.error("Error deleting admin:", error);
			// Handle the error, show an error message, etc.
		}
	};

	return (
		<>
			<div className='business__account-header'>
				<h4>Connect Socials</h4>
				<p>Connect your social media pages to place ads there</p>
			</div>
			<div className='business__settings-content'>
				<div className='account__settings--left'>
					<p>Connect Facebook</p>
					<p>Connect to Instagram</p>
					<p>Connect to Twitter</p>
				</div>
				<div className='account__settings--right'>
					<p>Connect</p>
					<p>Connect</p>
					<p>Connect</p>
				</div>
			</div>
			<div className='notifications'>
				<div className='notification__mobile'>
					<h4>Notification Preferences</h4>
				</div>
				<div className='notification__preferences'>
					<h4>Notification Preferences</h4>
					<div className='pust__email-notification'>
						<p>Push</p>
						<p>Emails</p>
					</div>
				</div>
				<div className='notification__preferences-body'>
					<div>
						<p>Subscriptions</p>
						<small>
							Notify me about activity from the businesses I’m subscribed to
						</small>
					</div>
					<div className='subscriptions-detail'>
						{pushNotificationEnabled ? (
							<BsCheckCircleFill
								className='check'
								onClick={handlePushNotificationChange}
							/>
						) : (
							<BsCircle onClick={handlePushNotificationChange} />
						)}
						{emailNotificationEnabled ? (
							<BsCheckCircleFill
								className='check'
								onClick={handleEmailNotificationChange}
							/>
						) : (
							<BsCircle onClick={handleEmailNotificationChange} />
						)}
					</div>
				</div>

				<div className='notification__preferences-body'>
					<div>
						<p>Business settings</p>
						<small>
							To change notification preferences for each subscribed business.
						</small>
					</div>
					<div className='subscriptions-detail'>
						{businessSettingsEnabled ? (
							<BsCheckCircleFill
								className='check'
								onClick={() =>
									setBusinessSettingsEnabled(!businessSettingsEnabled)
								}
							/>
						) : (
							<BsCircle
								onClick={() =>
									setBusinessSettingsEnabled(!businessSettingsEnabled)
								}
							/>
						)}
						{subscriptionsEnabled ? (
							<BsCheckCircleFill
								className='check'
								onClick={() => setSubscriptionsEnabled(!subscriptionsEnabled)}
							/>
						) : (
							<BsCircle
								onClick={() => setSubscriptionsEnabled(!subscriptionsEnabled)}
							/>
						)}
					</div>
				</div>

				<div className='notification__preferences-body'>
					<div>
						<p>Replies to my comments</p>
						<small>Notify me about replies to my comments</small>
					</div>
					<div className='subscriptions-detail'>
						{repliesToCommentsEnabled ? (
							<BsCheckCircleFill
								className='check'
								onClick={() =>
									setRepliesToCommentsEnabled(!repliesToCommentsEnabled)
								}
							/>
						) : (
							<BsCircle
								onClick={() =>
									setRepliesToCommentsEnabled(!repliesToCommentsEnabled)
								}
							/>
						)}
						{repliesToCommentsEnabledPush ? (
							<BsCheckCircleFill
								className='check'
								onClick={() =>
									setRepliesToCommentsEnabledPush(!repliesToCommentsEnabledPush)
								}
							/>
						) : (
							<BsCircle
								onClick={() =>
									setRepliesToCommentsEnabledPush(!repliesToCommentsEnabledPush)
								}
							/>
						)}
					</div>
				</div>
			</div>
			<div className='admin__access__option business__account-header'>
				<h4>Admin Access</h4>
				<div className='business__account__addadmin'>
					<p>You can add or remove purple pages users as your business admin</p>
					<button className='add_admin-button' onClick={handleAddAdminClick}>
						Add Admin
					</button>
				</div>
			</div>
			{admins.map(({ id, username, image, business_id }) => (
				<div className='admin__lists' key={id}>
					<div className='admin__list__username'>
						<img src={`https://api3.greeninkltd.com/${image}`} alt={username} />
						<p>{username}</p>
					</div>
					<RiDeleteBin6Line
						businessId={id}
						className='delete__admin'
						onClick={() => handleDeleteAdmin(business_id, username)}
					/>
				</div>
			))}
			<div className='business__account__addadmin-mobile'>
				<div></div>
				<div className='business__account__addadmin-mobile-left'>
					<AiOutlinePlus /> Admin
				</div>
			</div>
			{isAddingAdmin && (
				<AddAdminModal
					isOpen={isAddingAdmin}
					onClose={handleCloseModal}
					businessId={id}
					onAdminAdded={handleAdminAdded}
				/>
			)}
		</>
	);
};

export default BusinessAccountSetting;
