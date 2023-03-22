import React from 'react'
import { endedevents, upcomingevents  } from '../../data';
import { MdOutlineDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate'; // recommend

const UpcomingEvents = () => {
  return (
    <section className='events'> 
        <div className='ftrending__events'> 
           <h3>Upcoming</h3>
           <div className="ftrending__events__container">
            
           
                <div className='ftrending__events__wrapper'>
                    {
                        upcomingevents.map(({id,icon,title,category, date, detail, day, time}) => {
                            return <div className="ftrending__events__value" key={id}>
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

        <div className='ftrending__events'> 
           <h3>Ended</h3>
           <div className="ftrending__events__container">
            
           
                <div className='ftrending__events__wrapper'>
                    {
                        endedevents.map(({id,icon,title,category, date, detail, day, time}) => {
                            return <div className="ftrending__events__value" key={id}>
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

export default UpcomingEvents