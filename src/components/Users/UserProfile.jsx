import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im'
import { products } from '../../data';



const UserProfile = () => {
    const { id } = useParams();
    const product = products.find(product => product.id === parseInt(id));
    // Calculate the number of full stars to display
    const fullStars = Math.floor(product.rating);
    // Calculate the number of half stars to display
    const hasHalfStar = product.rating % 1 !== 0;
    // Calculate the number of empty stars to display
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <>
        <div className='user__header'>
        <div className="user__header__container">
            <div className="user__header__container-bg">
                <img src={product.background} alt="header bg" />
            </div>
            
        </div>
    </div>
    
      <div className='userprofile__container'>
        <div className="userprofile__infor-wrapper">
        <div className='userprofile__info-left'>
            <img className='userprofile__info-img' src={product.profile} />
            <div className="userprofile__info_body">
              
                <h3>{product.name}</h3>
              <div className="userprofile__info_body-mobile">
                <p className='userprofile__category'>{product.category}</p>
                <p>1.24k subscribers</p>
                <p>{product.location}</p>
              </div>
               <div className="rating">
                    {[...Array(fullStars)].map((_, index) => (
                      <ImStarFull key={index} />
                    ))}
                    {hasHalfStar && <ImStarHalf />}
                    {[...Array(emptyStars)].map((_, index) => (
                      <ImStarEmpty key={index} />
                    ))}
                  </div>
            </div>
        </div>
        <div className=''>
             <Link className='subscribe' to="">Subscribe</Link>
        </div>
         </div>
      </div>
      
    </>
  )
}

export default UserProfile
