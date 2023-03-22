import React, {useState }  from 'react'
import { categories, explore, trendingevents  } from '../../data';
import { MdOutlineDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom';
import TextTruncate from 'react-text-truncate'; // recommend
import Modal from '../Modals/Modal';

const FeaturedEvents = () => {
    const [openModal, setOpenModal] = useState(false)
  return (
    <section className='events'> 
        { openModal &&
          <Modal closeModal={setOpenModal}/>
          }
        <h3>Trending categories</h3>
            <div className="events__container">
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
        <div className='ftrending__events'> 
           <h3>Trending Events</h3>
           <div className="ftrending__events__container">
            
           
                <div className='ftrending__events__wrapper'>
                    {
                        trendingevents.map(({id,icon,title,category, date, detail, day, time}) => {
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