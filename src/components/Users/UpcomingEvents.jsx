import React, { useEffect, useState } from 'react'
import { endedevents, upcomingevents  } from '../../data';
import { MdOutlineDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate'; // recommend
import { getAllEvents } from '../../apis/EventsApis';

const UpcomingEvents = () => {
    const [event, setEvent] = useState([]);
    const [initialEvents, setInitialEvents] = useState([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getAllEvents();
        setEvent(response);
        setInitialEvents(response);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching Events:', error);
      }
    };
    fetchEvent();
  }, []);

  return (
    <section> 
        <section className='trending__events'>
    <h3>Upcoming</h3>
    <div className="trending__events__container">
      <div className='trending__events__wrapperx'>
        {
          event.map(({ id, event_location, event_name, days, event_flier, event_category, start_time, event_description, to_date, from_date, end_time }) => {
            // Get the current date
            const currentDate = new Date();

            // Convert the "to_date" to a Date object
            const toDate = new Date(to_date);

            // Check if the "to_date" is behind the current date
            if (toDate < currentDate) {
              return null; // Skip rendering the event
            }

            // Render the event details
            return (
              <div className="trending__events__value" key={id}>
                <Link to={`/events/${id}`}>
                  <img src={`https://api2.greeninkltd.com/${event_flier}`} alt="icon" />
                  <p className='category'>{event_category}</p>
                  <h4 className='title'><b>{event_name}</b></h4>
                  <p className='date'><MdOutlineDateRange />  {days}, {from_date} at {start_time} - {end_time}</p>
                  <p>{event_description}</p>
                </Link>
                <div className='link'>
                  <Link className='btn' to={`/events/${id}`}>View Detail</Link>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  </section>


        <section className='ftrending__events'> 
           <section className='trending__events'>
    <h3>Upcoming</h3>
    <div className="trending__events__container">
      <div className='trending__events__wrapperx'>
        {
          event.map(({ id, event_location, event_name, days, event_flier, event_category, start_time, event_description, to_date, from_date, end_time }) => {
            // Get the current date
            const currentDate = new Date();

            // Convert the "to_date" to a Date object
            const toDate = new Date(to_date);

            // Check if the "to_date" is behind the current date
            if (toDate > currentDate) {
              return null; // Skip rendering the event
            }

            // Render the event details
            return (
              <div className="trending__events__value" key={id}>
                <Link to={`/events/${id}`}>
                  <img src={`https://api2.greeninkltd.com/${event_flier}`} alt="icon" />
                  <p className='category'>{event_category}</p>
                  <h4 className='title'><b>{event_name}</b></h4>
                  <p className='date'><MdOutlineDateRange />  {days}, {from_date} at {start_time} - {end_time}</p>
                  <p>{event_description}</p>
                </Link>
                <div className='link'>
                  <Link className='btn' to={`/events/${id}`}>View Detail</Link>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  </section>
  </section>
    </section>
  )
}

export default UpcomingEvents