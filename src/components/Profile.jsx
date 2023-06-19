import React, { useEffect, useState } from 'react';
import './profile.css';
import AddBusiness from '../assets/add-line.png';
import Event from '../assets/event.png';
import { Link } from 'react-router-dom';
import { getUser } from '../apis';
import { getMyBusiness } from '../apis/BusinessApi';
import CreateBusiness from './Users/CreateBusiness';
import Logo from '../assets/pplogo.png';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [myBusiness, setMyBusiness] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchMyBusiness = async () => {
      try {
        const response = await getMyBusiness({ pageParam: 0 });
        setMyBusiness(response);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching Wishlists:', error);
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
        console.log('Error fetching User:', error);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt='Loading' />
      </div>
    );
  }

  return (
    <div className='profile'>
      <ul>
        
          <div className='profile__body'>
            {userInfo && (
            <Link to={`/personal/`}>
              <div className='profile__content-new'>
                <img className='user' src={userInfo.image} alt='icon' />
                <div className='profile__content-left'>
                  <p>{userInfo.username}</p>
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
                      src={`https://api.usepurplepages.com/${image}`}
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
        <Link to='/userevents/'>
          <div className='profile__content-new'>
            <img className='event' src={Event} alt='icon' />
            <div className='profile__content-left'>
              <p>Events</p>
            </div>
          </div>
        </Link>
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
    </div>
  );
};

export default Profile;