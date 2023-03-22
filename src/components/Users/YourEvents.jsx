import React from 'react'
import { yourevents } from '../../data';
import Sold from '../../assets/soldEvent.png'

const YourEvents = () => {
  return (
    <div>
    {yourevents.map(({ id, icon, title, start, ends, sold}) => {
              
              
              return (
    <div className='your__event-container' key={id}>
      <img src={icon} />
      
      <div className="event__details">
            <div className="event__details-top">
                <h2>{title}</h2>
            <small className='event__details-start'>{start}</small>
            <small className='event__details-end'>{ends}</small> 
            </div>
        <div className='your__event-sold'>
            <img src={Sold} />
            {sold}</div>  
        </div>
      </div>
      
    );
    })}
    
    </div>
  )
}

export default YourEvents
