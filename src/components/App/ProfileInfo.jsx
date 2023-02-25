import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im'
import { products } from '../../data';
import Header from '../../components/Header'


const ProfileInfo = () => {
    const { id } = useParams();
    const product = products.find(product => product.id === parseInt(id));
    // Calculate the number of full stars to display
    const fullStars = Math.floor(product.rating);
    // Calculate the number of half stars to display
    const hasHalfStar = product.rating % 1 !== 0;
    // Calculate the number of empty stars to display
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div>
        <Header  title="" image={product.background}></Header>
      <div className='container profile__container'>
        <div className="profile__infor-wrapper">
        <div className='profile__info-left'>
            <img className='profile__info-img' src={product.profile} />
            <div className="profile__info_body">
                <h3>{product.name}</h3>
                <p className='profile__category'>{product.category}</p>
                <p>1.24k subscribers</p>
                <p>{product.location}</p>
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
             <Link className='subscribe' to="">Subscribe</Link>
        </div>
         
      </div>
      
    </div>
  )
}

export default ProfileInfo
