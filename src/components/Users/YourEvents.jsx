import React from 'react'
import { yourevents } from '../../data';
import Sold from '../../assets/soldEvent.png'

const YourEvents = () => {
  return (
    <div>
      
    {yourevents.map(({ id, icon, title, start, ends, sold}) => {
              
              
              return (
    <div className='your__event-container' key={id}>
      <img className='your__event-container-img' src={icon} alt='logo'/>
      
      <div className="event__details">
            <div className="event__details-top">
                <h2>{title}</h2>
            <small className='event__details-start'>{start}</small>
            <small className='event__details-end'>{ends}</small> 
            </div>
        <div className='your__event-sold'>
            <img src={Sold} />
            <p>{sold}</p>
          </div>  
        </div>
      </div>
      
    );
    })}
    
    </div>
  )
}

export default YourEvents
