import React, { useEffect, useState } from 'react';
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import AddAdminModal from './AddAdminModal';
import { getAdmin, RevokeAccess } from '../../apis/BusinessApi';
import { useParams } from 'react-router-dom';

const BusinessAccountSetting = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAddAdminClick = () => {
    setIsAddingAdmin(true);
  };

  const handleCloseModal = () => {
    setIsAddingAdmin(false);
  };

  useEffect(() => {
    const fetchBusiness = async () => {
  try {
    const businessData = await getAdmin(id.toString()); // Convert id to a string if it's an object
    setBusiness(businessData);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching bio:', error);
  }
};

    fetchBusiness();
  }, [id]);

  const handleDeleteAdmin = async (businessId, username) => {
  try {
    await RevokeAccess({ business_id: businessId, username });
    // Update the state or perform any additional actions after successful deletion
  } catch (error) {
    console.error('Error deleting admin:', error);
    // Handle the error, show an error message, etc.
  }
};

  return (
    <>
      <div className='business__account-header'>
        <h4>Connect Socials</h4>
        <p>Connect your social media pages to place ads there</p>
      </div>
      <div className="business__settings-content">
        <div className="account__settings--left">
          <p>Connect Facebook</p>
          <p>Connect to Instagram</p>
          <p>Connect to Twitter</p>
        </div>
        <div className="account__settings--right">
          <p>Connect</p>
          <p>Connect</p>
          <p>Connect</p>
        </div>
      </div>
      <div className="notifications">
        <div className="notification__mobile">
          <h4>Notification Preferences</h4>
        </div>
        <div className="notification__preferences">
          <h4>Notification Preferences</h4>
          <div className='pust__email-notification'>
            <p>Push</p>
            <p>Emails</p>
          </div>
        </div>
        <div className="notification__preferences-body">
          <div>
            <p>Subscriptions</p>
            <small>Notify me about activity from the businesses I’m subscribed to</small>
          </div>
          <div className="subscriptions-detail">
            <BsCircle />
            <BsCheckCircleFill className='check'/>
          </div>
        </div>
        <div className="notification__preferences-body">
          <div>
            <p>Business settings</p>
            <small>To change notification preferences for each subscribed business.</small>
          </div>
          <div className="subscriptions-detail">
            <BsCheckCircleFill className='check'/>
            <BsCircle />
          </div>
        </div>
        <div className="notification__preferences-body">
          <div>
            <p>Replies to my comments</p>
            <small>Notify me about replies to my comments</small>
          </div>
          <div className="subscriptions-detail">
            <BsCheckCircleFill className='check'/>
            <BsCircle />
          </div>
        </div>
      </div>
      <div className='admin__access__option business__account-header'>
        <h4>Admin Access</h4>
        <div className="business__account__addadmin">
          <p>You can add or remove purple pages users as your business admin</p>
          <button className='add_admin-button' onClick={handleAddAdminClick}>Add Admin</button>
        </div>
      </div>
      {business?.map(({ id, username, image }) => (
        <div className="admin__lists" key={id}>
          <div className="admin__list__username">
            <img src={`https://api.usepurplepages.com/${image}`} alt={username} />
            <p>{username}</p>
          </div>
          <RiDeleteBin6Line className='delete__admin' onClick={() => handleDeleteAdmin(id, username)}/>
        </div>
      ))}
      <div className='business__account__addadmin-mobile'>
        <div></div>
        <div className="business__account__addadmin-mobile-left">
          <AiOutlinePlus /> Admin
        </div>
      </div>
      {isAddingAdmin && (
        <AddAdminModal isOpen={isAddingAdmin} onClose={handleCloseModal} businessId={id}/>
      )}
    </>
  );
};

export default BusinessAccountSetting;