import React, { useState } from 'react'
import './profile.css'
import User from '../assets/Autor1.png'
import AddBusiness from '../assets/add-line.png'
import Event from '../assets/event.png'
import { Link } from 'react-router-dom'
import { user } from '../data'


const Profile = () => {
   
  return (
    
    <div className='profile'>
        <ul>
            { user.map(({ id, name}) => {
            return (
            <div className='profile__body'>
        
                <Link to={`/personal/${id}`}>
            <div className='profile__content-new' key={id}>
                
                <img className='user' src={User} alt="icon" />                
                <div className='profile__content-left'>
                <p>{name}</p>
                </div>
                
            </div>
            </Link>
            <Link to={`/userprofile/${id}`}>
            <div className='profile__content-new'>
                <img className='user' src={AddBusiness} alt="icon" />                
                <div className='profile__content-left'>
                <p>Add Business</p>
                </div>
            </div>
            </Link>
            <Link to="/userevents/">
            <div className='profile__content-new'>
                <img className='event' src={Event} alt="icon" />                
                <div className='profile__content-left'>
                <p>Events</p>
                </div>
            </div>
            </Link>
            </div>
            );
            })}
        </ul>
    </div>
    )
}

export default Profile