import React, { useEffect, useState } from "react";
import "./profile.css";
import AddBusiness from "../assets/add-line.png";
import { Link } from "react-router-dom";
import { getUser } from "../apis";
import { getMyBusiness } from "../apis/BusinessApi";
import CreateBusiness from "./Users/CreateBusiness";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SignOut from "./Users/SignOut";

const Profile = ({ onClose }) => {
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [showSignoutModal, setShowSignoutModal] = useState(false);
	const [myBusiness, setMyBusiness] = useState([]);
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	const openModal = () => {
		setShowModal(true);
	};

	const openSignoutModal = () => {
		setShowSignoutModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		onClose(); // Call the onClose function from the parent component to close the modals
	};

	useEffect(() => {
		const fetchMyBusiness = async () => {
			try {
				const response = await getMyBusiness({ pageParam: 0 });
				setMyBusiness(response);
				setLoading(false);
			} catch (error) {
				console.log("Error fetching Wishlists:", error);
			}
		};
		fetchMyBusiness();
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

	return (
		<div className='profile'>
			<ul>
				<div className='profile__body'>
					{userInfo && (
						<Link to={`/personal/`}>
							<div className='profile__content-new'>
								<img className='user' src={userInfo.image} alt='icon' />
								<div className='profile__content-left'>
									<p>My Account</p>
								</div>
							</div>
						</Link>
					)}

					{myBusiness.map(({ id, image, name }) => (
						<div key={id}>
							<Link to={`/userprofile/${id}`}>
								<div className='profile__content-new'>
									<img
										className='user'
										src={`https://api3.greeninkltd.com/${image}`}
										alt='icon'
									/>
									<div className='profile__content-left'>
										<p>{name}</p>
									</div>
								</div>
							</Link>
						</div>
					))}

					<div className='profile__content-new' onClick={openModal}>
						<img className='user' src={AddBusiness} alt='icon' />
						<div className='profile__content-left'>
							<p>Add Business</p>
						</div>
					</div>

					<div
						className='profile__content-new sign_out'
						onClick={openSignoutModal}
					>
						<BiLogOut className='user' />
						<div className='profile__content-left'>
							<p>Sign Out</p>
						</div>
					</div>
				</div>
			</ul>

			{showModal && (
				<div className='modal'>
					<div className='modal-content'>
						<span className='close' onClick={closeModal}>
							&times;
						</span>
						<CreateBusiness closeModal={closeModal} />
					</div>
				</div>
			)}

			{showSignoutModal && (
				<div className='modal'>
					<div className='modal-content'>
						<span className='close' onClick={closeModal}>
							&times;
						</span>
						<SignOut closeModal={closeModal} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Profile;
