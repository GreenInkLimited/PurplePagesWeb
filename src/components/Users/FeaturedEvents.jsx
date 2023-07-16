import React, {useEffect, useState }  from 'react'
import { categories, explore, trendingevents  } from '../../data';
import { MdOutlineDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate'; // recommend
import Modal from '../Modals/Modal';
import { getAllEvents } from '../../apis/EventsApis';
import Logo from '../../assets/pplogo.png';

const FeaturedEvents = () => {
    const [openModal, setOpenModal] = useState(false)
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

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt="logo" />
      </div>
    );
  }
  return (
    <section className='events'> 
        { openModal &&
          <Modal closeModal={setOpenModal}/>
          }
        <h3>Trending categories</h3>
            <div className="ftrending__events__container">
                <div className='ftrending__events__wrapper-top'>
                    {
                        categories.map(({id,icon,title,path}) => {
                            return <div className="events__valuexxx" key={id}>
                                <img src={icon} alt="icon"/>
                                <p>{title}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        <div className='ftrending__events'> 
           <h3>Trending Events</h3>
           <div className="ftrending__events__container">
            
           
                <div className='ftrending__events__wrapper'>
                    {
              event.map(({ id, event_location, event_name, days, event_flier, event_category, start_time, event_description, from_date, end_time }) => {
                return <div className="trending__events__value" key={id}>
                  <img src={`https://api2.greeninkltd.com/${event_flier}`} alt="icon" />
                  <p className='category'>{event_category}</p>
                  <h4 className='title'><b>{event_name}</b></h4>
                  <p className='date'><MdOutlineDateRange />  {days}, {from_date} at {start_time} - {end_time}</p>
                  <p>{event_description}</p>
                  <div className='link'>
                    <Link className='btn' to={`/events/${id}`}>View Detail</Link>
                  </div>
                </div>
              })
            }
                </div>
            
        </div>
        </div>
        <div className='fexplore'> 
            <h3>Explore By Category</h3>
            <div className="fexplore__container">
                <div className='fexplore__wrapper'>
                    {
                        explore.map(({id,icon,title}) => {
                            return <div className="fexplore__value" key={id}>
                                <img src={icon} alt="icon"/>
                                <p>{title}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
        <div className='host__event__container'>
      <h2>Ready to host your events?</h2>
     <Link className='link btn white' onClick={() => { setOpenModal(true)}}>Let’s Get Started</Link>
    </div>
    </section>
  )
}

export default FeaturedEvents