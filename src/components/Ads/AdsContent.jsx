import React from 'react'
import { ads } from '../../data';
import { Link } from 'react-router-dom';

const AdsContent = () => {
  return (
      <div className="ads container">
        <div className="ads__container">
          <div className='ads__wrapper'>
            {ads.map(({ id, icon, profile, title, name, category }) => {
              return (
                <div key={id}>
                <div className="ads__value" >
                  <img src={icon} alt="icon" />
                  <div className='ads__bottom'>
                    <img src={profile} alt="autor" />
                    <div className="ads__bottom-detail">
                      <Link to={`/ads/${id}`}>
                        <h4>{name}</h4>
                      </Link>
                        <p>{title}</p>
                    </div>
                </div>
                </div>
                <p className='category'>{category}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
}

export default AdsContent
