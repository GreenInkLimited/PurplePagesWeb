import React from 'react'
import { review } from '../../data';
import { ImStarEmpty, ImStarFull, ImStarHalf } from 'react-icons/im'
import Progress from './Progress';

const Reviews = () => {
  return (
    
     
        <div className="review__container">
            <div className="review__value">
            <div className="review__top__right">
                <h3>3.5<span>/3</span></h3>
               
                <div className="rating">
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarFull />
                    <ImStarHalf />
                    <ImStarEmpty />
                </div>
                <p>Based on 75 verified users</p>
                
            </div>
                <div className="review__top__left">
            <div className="progress_content">
                <div className='on_the_left'>
                    <small>5</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                <Progress done="60"/>
                <div className='on_the_right'><small>45</small></div>
            </div>
            <div className="progress_content">
                <div className='on_the_left'>
                    <small>4</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                
                <Progress done="16"/>
                <div className='on_the_right'><small>12</small></div>
                </div>
                <div className="progress_content">
                <div className='on_the_left'>
                    <small>3</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                <Progress done="17"/>
                 <div className='on_the_right'><small>13</small></div>
                </div>
                <div className="progress_content">
                <div className='on_the_left'>
                    <small>2</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                <Progress done="1"/>
                 <div className='on_the_right'><small>1</small></div>
                </div>
                <div className="progress_content">
                <div className='on_the_left'>
                    <small>1</small>  
                
                     
                    <ImStarFull className="rating"/>
                    
                </div>
                <Progress done="4"/>
                 <div className='on_the_right'><small>2</small></div>
                </div>
                </div>
            </div>
          <div className='review__wrapper'>
            
            {review.map(({ id, rating, name, date, title, review}) => {
              // Calculate the number of full stars to display
              const fullStars = Math.floor(rating);
              // Calculate the number of half stars to display
              const hasHalfStar = rating % 1 !== 0;
              // Calculate the number of empty stars to display
              const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
              
              return (
                <section>
                
                <div className="review__value" key={id}>
                    
                  <div className="review_left">
                        <div className="rating">
                    {[...Array(fullStars)].map((_, index) => (
                      <ImStarFull key={index} />
                    ))}
                    {hasHalfStar && <ImStarHalf />}
                    {[...Array(emptyStars)].map((_, index) => (
                      <ImStarEmpty key={index} />
                    ))}
                  </div>
                        <h4>{name}</h4>
                        <small>{date}</small>
                  </div>
                  <div className="review__right">
                    <h4>{title}</h4>
                    <p>{review}</p>
                  </div>
                </div>
                </section>
              );
            })}
          </div>
        </div>
        
      
    
  );
}

export default Reviews;

