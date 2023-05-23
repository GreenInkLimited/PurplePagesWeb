import React, {useState} from 'react'
import Header from '../../components/Header'
import HeaderImage from '../../assets/ticket.png'
import './events.css'
import Footer from '../../components/Footer';
import Categories from '../../components/Events/Categories';
import TrendingEvents from '../../components/Events/TrendingEvents';
import Explore from '../../components/Events/Explore';
import HostEvent from '../../components/Events/HostEvent';
import search from '../../assets/search.png'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modals/Modal';
import HostEventModal from '../../components/Modals/HostEventModal';

const Events = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
    { openModal &&
          <HostEventModal closeModal={setOpenModal}/>
          }
    <Navbar />
    <Header  title="Find your next event" image={HeaderImage}>
        <div className="event__searchContainer">
            <div className="event__search">
                <input className='inputing' placeholder='Artist, event, location, category, speaker'/>
                <div className="event__search__bg">
                <img src={search}  className="event__search__icon"/>
                </div>
            </div>
        </div>
    </Header>
    <Categories />
    <TrendingEvents />
    <Explore />
    <div className='container host__event__container'>
      <h2>Ready to host your event?</h2>
     <Link className='link btn white' onClick={() => { setOpenModal(true)}}>Let’s Get Started</Link>
    </div>
    <Footer />
    </>
  )
}

export default Events;