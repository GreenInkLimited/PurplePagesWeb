import React, {useState, useEffect} from 'react';
import { getProductById } from '../../apis/BusinessApi';
import { Link, useParams } from 'react-router-dom';
import Frame from '../../assets/Frame.png';
import ExternalLinkLine from '../../assets/ExternalLinkLine.png';
import SingleProfile from '../../assets/SingleProfile.png';
import Share from '../../assets/Share.png';
import bookmark from '../../assets/bookmark.png';
import MoreProducts from './MoreProducts';
import SuggestedProducts from './SuggestedProducts';
import  Logo from '../../assets/pplogo.png'

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className='spinner_container'>
      <img src={Logo} />
    </div>;
  }
  return (
    <div className='container singleproduct__detail'>
     
        
        <div className='singleproduct-content'>
          <div className='singleproduct-left'>
            <img src={product.image} alt="product"/>
          </div>
          <div className='singleproduct-right'>
            <div className='singleproduct__right-header'>
            <h3>{product.caption}</h3>
            <img src={ExternalLinkLine} />
            </div>
            <h4 className='singleproduct'>₦{product.price}.00</h4>
            <img className='frame' src={Frame} alt="frame" />
            <div className="product__desc">
                <h5 className='product__desc__header'>Product Details</h5>
                <p>{product.detail}</p>
            </div>

            <div className="singlepotter__bottom">
                <div className="singlepotter__bottom_left">
                    <img src={SingleProfile} />
                    <div>
                    <h5>{product.owner.name}</h5>
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
