import React from 'react'
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

const Events = () => {
  return (
    <>
    <Navbar />
    <Header  title="Find your next event" image={HeaderImage}>
        <div className="event__searchContainer">
            <div className="event__search">
                <input className='input' placeholder='Artist, event, location, category, speaker'/>
                <div className="event__search__bg">
                <img src={search}  className="event__search__icon"/>
                </div>
            </div>
        </div>
    </Header>
    <Categories />
    <TrendingEvents />
    <Explore />
    <HostEvent />
    <Footer />
    </>
  )
}

export default Events