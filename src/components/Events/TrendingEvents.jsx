import React from 'react'
import { trendingevents } from '../../data';
import { MdOutlineDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate'; // recommend

const TrendingEvents = () => {
  return (
    <section className='trending__events'> 
        <div className="container">
           <h2>TRENDING EVENTS</h2>
           <div className="trending__events__container">
            
           
                <div className='trending__events__wrapper'>
                    {
                        trendingevents.map(({id,icon,title,category, date, detail, day, time}) => {
                            return <div className="trending__events__value" key={id}>
                                <img src={icon} alt="icon"/>
                                <p className='category'>{category}</p>
                                <h4 className='title'>{title}</h4>
                                <p className='date'><MdOutlineDateRange />  {day}, {date} at {time}</p>
                                <TextTruncate
                                    line={3}
                                    element="p"
                                    truncateText="…"
                                    text={detail}
                                    textTruncateChild=""
                                />
                                <div className='link'>
                                <Link className='btn sm' to={`/events/${id}`}>View Detail</Link>
                                </div>
                            </div>
                        })
                    }
                </div>
            
        </div>
        </div>
    </section>
  )
}

export default TrendingEvents
