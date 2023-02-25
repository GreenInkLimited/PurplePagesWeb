import React from 'react';
import { productsandservice } from '../../data';
import { Link, useParams } from 'react-router-dom';
import Frame from '../../assets/Frame.png';
import ExternalLinkLine from '../../assets/ExternalLinkLine.png';
import SingleProfile from '../../assets/SingleProfile.png';
import Share from '../../assets/Share.png';
import bookmark from '../../assets/bookmark.png';
import MoreProducts from './MoreProducts';
import SuggestedProducts from './SuggestedProducts';

const SingleProduct = () => {
    const { id } = useParams();
    const event = productsandservice.find(event => event.id === parseInt(id));
  return (
    <div className='container singleproduct__detail'>
     
        
        <div className='singleproduct-content'>
          <div className='singleproduct-left'>
            <img src={event.icon} />
          </div>
          <div className='singleproduct-right'>
            <div className='singleproduct__right-header'>
            <h3>{event.name}</h3>
            <img src={ExternalLinkLine} />
            </div>
            <h4 className='singleproduct'>₦{event.price}.00</h4>
            <img className='frame' src={Frame} alt="" />
            <div className="product__desc">
                <h5 className='product__desc__header'>Product Details</h5>
                <p>Lorem ipsum dolor sit amet consectetur. Convallis facilisis pellentesque aliquam integer massa non lectus. Facilisis odio diam sed nibh vivamus sed. Placerat risus viverra adipiscing.</p>
            </div>

            <div className="singlepotter__bottom">
                <div className="singlepotter__bottom_left">
                    <img src={SingleProfile} />
                    <div>
                    <h5>Purple Closet</h5>
                    <small>1.24k subscribers</small>
                    </div>
                </div>
                <div className="singlepotter__bottom_right">
                    <div className='bookmark'>
                    <img src={bookmark} />
                    </div>
                    <img src={Share} />
                </div>
            </div>
          </div>
         
        </div>

        <div>
            <MoreProducts />
            <SuggestedProducts />
        </div>
         
      
    </div>
  )
}

export default SingleProduct
