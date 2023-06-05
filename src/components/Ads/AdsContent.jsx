import React, { useEffect, useState } from 'react'
import { ads } from '../../data';
import { Link } from 'react-router-dom';
import { getAllAds } from '../../apis/AdsApis';
import  Logo from '../../assets/pplogo.png'
import profile from '../../assets/Autor3.png'
import { ownerDocument } from '@mui/material';

const AdsContent = () => {
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdverts = async () => {
      try {
        const response = await getAllAds({ pageParam: 0 });
        setAdverts(response);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching adverts:', error);
      }
    };
    fetchAdverts();
  }, []);

  

  if (loading) {
    return <div className='spinner_container'>
      <img src={Logo} />
    </div>;
  }
  return (
      <div className="ads container">
        <div className="ads__container">
          <div className='ads__wrapper'>
            {adverts.map(({ id, title, image, owner, ads_type }) => {
              return (
                <div key={id}>
                <div className="ads__value" >
                  <img className="ads__value-img" src={`https://api.usepurplepages.com/${image}`} alt="icon" />
                  <div className='ads__bottom'>
                    <img src={`https://api.usepurplepages.com/${owner.image}`} alt="autor" />
                    <div className="ads__bottom-detail">
                      <Link to={`/ads/${id}`}>
                        <h4>{title}</h4>
                      </Link>
                        <p>{ owner.name}</p>
                    </div>
                </div>
                </div>
                <p className='ads_category'>{ ads_type }</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
}

export default AdsContent
