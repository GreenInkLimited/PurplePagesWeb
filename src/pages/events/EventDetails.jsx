import React from 'react'
import Footer from '../../components/Footer'
import { Link, useParams } from 'react-router-dom';
import { trendingevents } from '../../data';
import Header from '../../components/Header'
import { MdOutlineDateRange } from 'react-icons/md'
import { BiTime } from 'react-icons/bi'
import './events.css'
import { categories } from '../../data';
import Navbar from '../../components/Navbar';

const EventDetails = () => {
    const { id } = useParams();
    const event = trendingevents.find(event => event.id === parseInt(id));
  return (
    <>
    <Navbar />
     <Header  title="" image={event.header}>
       
    </Header>
    <section className='event__detail'>
      <div className='container'>
        
        <div className='event__detail-content'>
          <div className='event__detail-left'>
            <h2>{event.title}</h2>
            <p className='date'><BiTime /> {event.day}</p>
            <p className='date'><MdOutlineDateRange /> {event.date}</p>
            <p className='date'><BiTime /> {event.time}</p>
          </div>
          <div className='event__detail-right'>
            <h3 className='detail'>{event.price}</h3>
            <Link to="/" className='btn fill'>Buy Ticket</Link>
          </div>
         
        </div>
         <div className="event__detail-desc">
          <p>Description</p>
            <small>{event.detail}</small>
          </div>

          
          
            <div className="events__container">
            <p>Categories</p>
           
                <div className='events__wrapper'>
                    {
                        categories.map(({id,icon,title,path}) => {
                            return <div className="events__value" key={id}>
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
