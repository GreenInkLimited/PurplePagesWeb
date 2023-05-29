import React, { useState } from 'react';
import './profile.css';
import User from '../assets/Autor1.png';
import AddBusiness from '../assets/add-line.png';
import Event from '../assets/event.png';
import { Link } from 'react-router-dom';
import { user } from '../data';
import CreateBusiness from './Users/CreateBusiness';

const Profile = () => {
  const [showModal, setShowModal] = useState(false); // Add state to control modal visibility

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='profile'>
      <ul>
        {user.map(({ id, name }) => {
          return (
            <div className='profile__body' key={id}>
              <Link to={`/personal/`}>
                <div className='profile__content-new'>
                  <img className='user' src={User} alt='icon' />
                  <div className='profile__content-left'>
                    <p>{name}</p>
                  </div>
                </div>
              </Link>
              <div className='profile__content-new' onClick={openModal}> {/* Use onClick event to open the modal */}
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
          );
        })}
      </ul>
      {/* Modal for adding a business */}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>
              &times;
            </span>
            {/* Add your modal content here */}
           <CreateBusiness closeModal={closeModal}/>
            {/* Additional form or content for adding a business */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;