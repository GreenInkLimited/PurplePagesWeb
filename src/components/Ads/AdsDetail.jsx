import React from 'react'
import { ads } from '../../data';
import Ads1 from '../../assets/ads1.png'
import Ads2 from '../../assets/ads2.png'
import Ads3 from '../../assets/ads3.png'
import Comment from '../../assets/comment.png'
import {AiOutlineLike, AiOutlineShareAlt, AiOutlineEye} from 'react-icons/ai'
import {BsBookmark} from 'react-icons/bs'
import {RiArrowDropDownLine} from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom';

const AdsDetail = () => {

const { id } = useParams();
  const event = ads.find(event => event.id === parseInt(id));
  return (
    <div className='container blog__detail'>
        
      <div className='blog__detail-content'>
        <img src={event.background} />
      </div>
      <div className="blog__detail-header">
        <div className="ads__title-body">
            <h2>{event.name}</h2>
            <div className="ads__title__left">
                <BsBookmark />
                <AiOutlineShareAlt />
            </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur. Lorem ante ornare nec ultrices eleifend a feugiat nullam bibendum. Vivamus at nunc velit ornare sit amet pellentesque egestas. Orci fringilla erat urna malesuada nunc viverra. Nec iaculis integer in duis imperdiet. Iaculis donec nam vel ullamcorper non cras tincidunt duis porttitor. Bibendum ultrices malesuada dolor sit tellus semper est. Sociis at orci arcu vel urna integer.</p>

        <div className='ads__tags'>
            <div className="ads__tags-left">
          <p><AiOutlineLike /> 2.4k</p>
          <p><BsBookmark /> 260</p>
          <p><AiOutlineEye /> 6.4k</p>
          
          </div>
          <div className="ads__tags-right">
            <p>Recently Viewed</p>
          </div>
        </div>
        
        </div>
      <div className='ads__body'>
        
        <div className="ads_body_left">
        <div className="ads__recent-post">
            <div className='ads__bottom'>
            <img src={event.profile} alt="autor" />
                <div className="ads__bottom-detail">
                    <h4>Purple Closet</h4>
                    <p>Fashion</p>
                    <small>1.24k subscribers</small>
                </div>
                 <button className='post'>Subscribe</button>
        </div>
          <div className="recent__post-header">
          <h4>MOST RECENT</h4>
          <RiArrowDropDownLine />
          </div>
          <div className="ads__comment-body">
          <img src={Comment} />
          <div>
            <h4>Purplepages01</h4>
            <div className="ads__comment">
            <p>Love this piece, so informative. Keep it up purple closet👏</p>
            <div className="ads__info">
                <AiOutlineLike />
                <small>32</small>
            <div className="ads__info-reply">
              <small>Reply</small>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="ads__comment-body">
          <img src={Comment} />
          <div>
            <h4>Purplepages01</h4>
            <div className="ads__comment">
            <p>Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget. Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget.</p>
            
              <div className="ads__info">
                <AiOutlineLike />
                <small>32</small>
            <div className="ads__info-reply">
              <small>Reply</small>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="ads__comment-body">
          <img src={Comment} />
          <div>
            <h4>Purplepages01</h4>
            <div className="ads__comment">
            <p>Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget. Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget.</p>
            
              <div className="ads__info">
                <AiOutlineLike />
                <small>32</small>
            <div className="ads__info-reply">
              <small>Reply</small>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="ads__comment-body">
          <img src={Comment} />
          <div>
            <h4>Purplepages01</h4>
            <div className="ads__comment">
            <p>Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget. eget. Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget. </p>
            
             <div className="ads__info">
                <AiOutlineLike />
                <small>32</small>
            <div className="ads__info-reply">
              <small>Reply</small>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="ads__comment-body">
          <img src={Comment} />
          <div>
            <h4>Purplepages01</h4>
            <div className="ads__comment">
            <p>Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget. eget. Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget. </p>
            
              <div className="ads__info">
                <AiOutlineLike />
                <small>32</small>
            <div className="ads__info-reply">
              <small>Reply</small>
            </div>
            </div>
            </div>
          </div>
        </div>
        <div className="ads__comment-body">
          <img src={Comment} />
          <div>
            <h4>Purplepages01</h4>
            <div className="ads__comment">
            <p>Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget. Lorem ipsum dolor sit amet consectetur. Egestas in feugiat leo phasellus faucibus ullamcorper eget.</p>
            
              <div className="ads__info">
                <AiOutlineLike />
                <small>32</small>
            <div className="ads__info-reply">
              <small>Reply</small>
            </div>
            </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div>
        <div className="ads__body__right">
        <img src={Ads1} />
        <h4>Court Shoes</h4>
            <small>Purple Closet</small>
        </div>
        <div className="ads__body__right">
        <img src={Ads2} />
        <h4>Financial Reservoir</h4>
            <small>Smart Money Lady</small>
        </div>
        <div className="ads__body__right">
        <img src={Ads3} />
        <h4>Water Proof Camera with aviation glasses</h4>
            <small>Groot Gadgets</small>
        </div>
        <div className="ads__body__right">
        <img src={Ads2} />
        <h4>Sugar glazed donut with sprinkles</h4>
            <small>Charlie’s Bagel Garden</small>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdsDetail
