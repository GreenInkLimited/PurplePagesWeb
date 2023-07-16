import React, { useEffect, useState } from 'react';
import { MdOutlineDateRange } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { getAllEvents } from '../../apis/EventsApis';
import Logo from '../../assets/pplogo.png';

const TrendingEvents = ({ searchQuery, searchResults }) => {
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

  // Filter events based on search query
  useEffect(() => {
    if (searchQuery && initialEvents.length > 0) {
      const filteredEvents = initialEvents.filter((event) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
          (event.event_name && event.event_name.toLowerCase().includes(lowerCaseQuery)) ||
          (event.event_location && event.event_location.toLowerCase().includes(lowerCaseQuery)) ||
          (event.event_category && event.event_category.toLowerCase().includes(lowerCaseQuery)) ||
          (event.event_owner && event.event_owner.toLowerCase().includes(lowerCaseQuery))
        );
      });
      setEvent(filteredEvents);
    } else {
      setEvent(initialEvents); // Reset to the original list of events
    }
  }, [searchQuery, initialEvents]);

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt="logo" />
      </div>
    );
  }

  return (
    <section className='trending__events'>
      <div className="container">
        <h2 className='trending__categories'>Trending Events</h2>
        <div className="trending__events__container">
          <div className='trending__events__wrapper'>
            {
              event.map(({ id, event_location, event_name, days, event_flier, event_category, start_time, event_description, from_date, end_time }) => {
                return <div className="trending__events__value" key={id}>
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
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrendingEvents;