import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMyBusinessById } from '../../apis/BusinessApi';
import Sender from '../../assets/comment.png';
import Clip from '../../assets/emailclip.png';
import SendMailModal from './SendMailModal';
import Logo from '../../assets/pplogo.png';

const EmailMarketing = () => {
    const { id } = useParams(); // Make sure to include curly braces around `useParams`
    const [business, setBusiness] = useState(null);
    const [showEmailBody, setShowEmailBody] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const businessData = await getMyBusinessById({ id });
        setBusiness(businessData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bio:', error);
      }
    };

    fetchBusiness();
  }, [id]);

  const toggleEmailBody = () => {
    setShowEmailBody(!showEmailBody);
  };

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt='Loading' />
      </div>
    );
  }

  return (
    <>
      <div className="email__marketing-container">
        <div className="email__marketing-header">
            {showAddProductModal && (
        <div className='add-product-modal'>
          <SendMailModal onCancel={closeAddProductModal} businessId={id}/>
        </div>
      )}
          <h3>Email History</h3>
          <button onClick={openAddProductModal} className="subscribe">Send email</button>
        </div>
        <div className="email__marketing-wrapper">
          <h5>Lorem ipsum dolor sit amet</h5>
          <div className="email__marketting-sender">
            <div className="email__marketing-senderleft">
              <img src={Sender} alt="Sender" />
              <div className="email__marketing-senderdetails">
                <p>Purple Closet</p>
                <small>To 1000 subscribers</small>
              </div>
            </div>
            <div className="email__marketing-senderright">
              <p>Jan 1</p>
            </div>
          </div>
          {showEmailBody ? (
            <>
              <div className="email__marketing-content">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Massa ame nibh nunc amet imperdiet velit lacus viverra qsque.
                  Sed quis sit risus cursus. Posuere cursus aliquet nec ut risus fringilla in integer. Feugiat ut morbi
                  morbi ut pharetra eu. Aliquet velit dui egestas aliquetgu faucibus dolor. Egestas augue pharetra
                  tincidunt et in aliquet. Urna risus dictum amet ac dolor augue sed. Est risus dui ornare felis viverra.
                  Libero scelque cras in tincidunt est ac ac sem. Vel mi fames sagittis id urna. Quis lacinia. Vel mi
                  fames sagittis id urna. Quis lacinia.
                </p>
              </div>
              <div className="email__marketing-clip">
                <img src={Clip} alt="Clip" />
              </div>
              <div className="email__marketing-info">
                <img src={Sender} alt="Sender" />
                <div className="email__marketing-senderdetails">
                  <p>Purple Closet</p>
                  <p>Fashion</p>
                  <p>+234000 0000 000</p>
                  <p>@Purplecloset</p>
                  <p>Address(if any)</p>
                </div>
              </div>
              <div className="email__seeless" onClick={toggleEmailBody}>
                <p>Show less</p>
              </div>
            </>
          ) : (
            <div className="email__seeless" onClick={toggleEmailBody}>
              <p>Show more</p>
            </div>
          )}

          <div className="more__emails">
          <div className="email__marketing-senderleft">
            <img src={Sender} alt="Sender" />
            <div className="email__marketing-senderdetails">
              <div className="more__email-marketing">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p>Jan 1</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consetur. Elementum intertyhhkkh olor sit amet. Lorem ipsum dolor sit amet
                consetur. Elementum intertyhhkkh olor sit amet Lorem ipsum dolor sit amet consetur. Elementum
                intertyhhkkh olor sit amet{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="more__emails">
          <div className="email__marketing-senderleft">
            <img src={Sender} alt="Sender" />
            <div className="email__marketing-senderdetails">
              <div className="more__email-marketing">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p>Jan 1</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consetur. Elementum intertyhhkkh olor sit amet. Lorem ipsum dolor sit amet
                consetur. Elementum intertyhhkkh olor sit amet Lorem ipsum dolor sit amet consetur. Elementum
                intertyhhkkh olor sit amet{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="more__emails">
          <div className="email__marketing-senderleft">
            <img src={Sender} alt="Sender" />
            <div className="email__marketing-senderdetails">
              <div className="more__email-marketing">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p>Jan 1</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consetur. Elementum intertyhhkkh olor sit amet. Lorem ipsum dolor sit amet
                consetur. Elementum intertyhhkkh olor sit amet Lorem ipsum dolor sit amet consetur. Elementum
                intertyhhkkh olor sit amet{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="more__emails">
          <div className="email__marketing-senderleft">
            <img src={Sender} alt="Sender" />
            <div className="email__marketing-senderdetails">
              <div className="more__email-marketing">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p>Jan 1</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consetur. Elementum intertyhhkkh olor sit amet. Lorem ipsum dolor sit amet
                consetur. Elementum intertyhhkkh olor sit amet Lorem ipsum dolor sit amet consetur. Elementum
                intertyhhkkh olor sit amet{' '}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="email__marketing-senderleft">
            <img src={Sender} alt="Sender" />
            <div className="email__marketing-senderdetails">
              <div className="more__email-marketing">
                <h4>Lorem ipsum dolor sit amet</h4>
                <p>Jan 1</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consetur. Elementum intertyhhkkh olor sit amet. Lorem ipsum dolor sit amet
                consetur. Elementum intertyhhkkh olor sit amet Lorem ipsum dolor sit amet consetur. Elementum
                intertyhhkkh olor sit amet{' '}
              </p>
            </div>
          </div>
        </div>
        </div>
      
      </div>
    </>
  );
};
    

export default EmailMarketing;