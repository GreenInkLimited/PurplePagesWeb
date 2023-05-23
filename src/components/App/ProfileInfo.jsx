import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im';
import Header from '../../components/Header';
import { getBusinessById } from '../../apis/BusinessApi';
import  Logo from '../../assets/pplogo.png'

const ProfileInfo = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getBusinessById({ id });
        setBusiness(businessData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching business:', error);
      }
    };

    fetchBusiness();
  }, [id]);

  if (loading) {
    return <div className='spinner_container'>
      <img src={Logo} />
    </div>;
  }

  // Calculate the number of full stars to display
  const fullStars = Math.floor(business.rating ?? 0);
  // Calculate the number of half stars to display
  const hasHalfStar = business.rating % 1 !== 0;
  // Calculate the number of empty stars to display
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div>
      <Header title="" image={`https://api.usepurplepages.com/${business.image}`} />
      <div className='container profile__container'>
        <div className='profile__infor-wrapper'>
          <div className='profile__info-left'>
            <img className='profile__info-img' src={`https://api.usepurplepages.com/${business.image}`} alt={business.name} />
            <div className='profile__info_body'>
              <h3>{business.name}</h3>
              <div className='profile__info_body-detail'>
                <p className='profile__category'>{business.category}</p>
                <p>1.24k subscribers</p>
                <p>{business.location}</p>
              </div>
              <div className='rating'>
                {[...Array(fullStars)].map((_, index) => (
                  <ImStarFull key={`full-${index}`} />
                ))}
                {hasHalfStar && <ImStarHalf key='half' />}
                {[...Array(emptyStars)].map((_, index) => (
                  <ImStarEmpty key={`empty-${index}`} />
                ))}
              </div>
            </div>
          </div>
          <Link className='subscribe' to=''>
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;