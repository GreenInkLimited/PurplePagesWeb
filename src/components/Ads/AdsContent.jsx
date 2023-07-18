import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllAds } from '../../apis/AdsApis';
import Logo from '../../assets/pplogo.png';

const AdsContent = ({ searchQuery, searchResults, filteredResults }) => {
  const [adverts, setAdverts] = useState([]);
  const [showCount, setShowCount] = useState(8);
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

  const handleLoadMore = () => {
    setShowCount((prevCount) => prevCount + 8);
  };

  const adsToDisplay = searchQuery
    ? searchResults
    : filteredResults.length > 0
    ? filteredResults
    : adverts;

  if (loading) {
    return (
      <div className="spinner_container">
        <img src={Logo} alt="logo" />
      </div>
    );
  }

  return (
    <div className="ads container">
      <div className="ads__container">
        <div className="ads__wrapper">
          {adsToDisplay.slice(0, showCount).map(({ id, title, image, owner, ads_type }) => {
            const adType = ads_type;

            let adLink = '';
            if (adType === 'blog') {
              adLink = `/appblog/${id}`;
            } else if (adType === 'business') {
              adLink = `/business/${id}`;
            } else if (adType === 'brand') {
              adLink = `/ads/${id}`;
            } else if (adType === 'product') {
              adLink = `/singleproduct/${id}`;
            }

            

            return (
              <div key={id}>
                <div className="ads__value">
                  <img className="ads__value-img" src={`https://api2.greeninkltd.com/${image}`} alt="icon" />
                  <div className="ads__bottom">
                    {owner && owner.image && <img src={`https://api2.greeninkltd.com/${owner.image}`} alt="autor" />}
                    <div className="ads__bottom-detail-flex">
                      <div className="ads__bottom-detail">
                        <Link to={adLink}>
                          <h4>{title}</h4>
                        </Link>
                        {owner && owner.name && <p>{owner.name}</p>}
                      </div>
                      <p className="ads_category">{ads_type}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showCount < adverts.length && (
        <div className="product__load-more">
          <button onClick={handleLoadMore}>Load More....</button>
        </div>
      )}
    </div>
  );
};

export default AdsContent;