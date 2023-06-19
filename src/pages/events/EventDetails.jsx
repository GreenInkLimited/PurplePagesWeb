import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { Link, useParams } from 'react-router-dom';
import { trendingevents } from '../../data';
import './events.css';
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modals/Modal';
import { getEventById } from '../../apis/EventsApis';
import icon from '../../assets/fashion.png';
import Logo from '../../assets/pplogo.png';
import {RiCalendarEventLine, RiTimeLine} from 'react-icons/ri';
import { TiLocationOutline } from 'react-icons/ti'



const EventDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const event = trendingevents.find((event) => event.id === parseInt(id));
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvents(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className='spinner_container'>
        <img src={Logo} alt="logo" />
      </div>
    );
  }

  const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  const day = date.getDate();
  let daySuffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  }
  const formattedDate = date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  return `${day}${daySuffix} of ${formattedDate}`;
};

  return (
    <>
      {openModal && <Modal closeModal={setOpenModal} />}

      <Navbar />
    {events && (
      <header className='myevent__header'>
        <div className="myevent__header__container">
          <div className="myevent__header__container-bg">
            <img src={`https://api.usepurplepages.com/${events.event_flier}`} alt="header bg" />
          </div>
        </div>
    </header>
    )}
      <section className="event__detail">
        <div className="container">
          <div className="event__detail-content">
            <div className="event__detail-left">
              {events && (
                <>
                  <h2>{events.event_name}</h2>
                  {events.from_date && events.to_date ? (
                  <div className="event_gen-info">
                    <RiCalendarEventLine />
                    <p className="date">
                      {formatDate(events.from_date)} to {formatDate(events.to_date)}
                    </p>
                  </div>
                  ) : (
                      <div className="event_gen-info">
                    <RiCalendarEventLine />
                    <p className="date">
                        {events.days} - {formatDate(events.end_date)}
                    </p>
                  </div>
                    )}
                  <div className="event_gen-info">
                    <RiTimeLine />
                    <p className="date">
                      {events.start_time} - {events.end_time}
                    </p>
                  </div>
                  <div className="event_gen-info">
                    <TiLocationOutline />
                    <p className="date">
                        {events.event_location} 
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="event__detail-right">
              {events && (
                <>
                  <h3 className="detail">₦{events.ticket_price}</h3>
                  <Link
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className="btn fill"
                  >
                    Buy Ticket
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="event__detail-desc">
            <p>Description</p>
            {events && <small>{events.event_description}</small>}
          </div>

          <div className="events__container">
            <p className="event__categories">Category</p>

            <div className="events__wrapper">
              
                {events && (
                  <div className="events-details__value" key={id}>
                    <img src={icon} alt="Category Icon" />
                    <p>{events.event_category}</p>
                  </div>
                )}
              
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default EventDetails;