import React, {useState } from 'react'
import Footer from '../../components/Footer'
import { Link, useParams } from 'react-router-dom';
import { trendingevents } from '../../data';
import Header from '../../components/Header'
import './events.css'
import { category } from '../../data';
import Navbar from '../../components/Navbar';
import Modal from '../../components/Modals/Modal';
import EventDate from '../../assets/EventDate.png'
import EventTime from '../../assets/EventTime.png'
import EventLocation from '../../assets/EventLocationn.png'




const EventDetails = () => {
  const [openModal, setOpenModal] = useState(false)
    const { id } = useParams();
    const event = trendingevents.find(event => event.id === parseInt(id));
  return (
    <>
    { openModal &&
          <Modal closeModal={setOpenModal}/>
          }
    
    <Navbar />
    
    <Header  title="" image={event.header}>
    </Header>
    <section className='event__detail'>
      <div className='container'>
        
        <div className='event__detail-content'>
          <div className='event__detail-left'>
            <h2>The event title goes here</h2>
            <div className='event_gen-info'>
            <img src={EventDate} />
            <p className='date'> <b>Mon xx</b></p>
            </div>
            <div className='event_gen-info'>
            <img src={EventLocation} />
            <p className='date'> <b>Date</b></p>
            </div>
            <div className='event_gen-info'>
            <img src={EventTime} />
            <p className='date'> <b>Time</b></p>
            </div>
          </div>
          <div className='event__detail-right'>
            <h3 className='detail'>{event.price}</h3>
            <Link onClick={() => { setOpenModal(true)}} className='btn fill'>Buy Ticket</Link>
          </div>
          
        </div>
         <div className="event__detail-desc">
          <p>Description</p>
            <small>{event.detail}</small>
          </div>

          
          
            <div className="events__container">
            <p className='event__categories'>Category</p>
           
                <div className='events__wrapper'>
                    {
                        category.map(({id,icon,title,path}) => {
                            return <div className="events-details__value" key={id}>
                                <img src={icon} alt="icon"/>
                                <p>{title}</p>
                            </div>
                        })
                    }
                </div>
            
        
          </div>
      </div>
    </section>
    <Footer />
    </>
  );
}

export default EventDetails
