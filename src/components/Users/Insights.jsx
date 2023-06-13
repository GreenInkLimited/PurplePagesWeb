import React from 'react'
import Posts from '../../assets/Posts.png'
import Users from '../../assets/UserReached.png'
import Sub from '../../assets/Subscribers.png'
import Export from '../../assets/export.png'
import Calendar from '../../assets/Calendar.png'
import {RiCalendar2Line } from 'react-icons/ri'

const Insights = () => {
  return (
    <div className='insights__container'>
      <div className="insights__wrapper-top">
            <div className="insights__wrapper-body">
                <div className="insights__wrapper-body-subs">
                <p>Subscribers</p>
                <div>
                <img src={Sub} alt="sub" />
                </div>
                </div>
                <div>
                    <h2>3,578</h2>
                </div>
            </div>
            <div className="insights__wrapper-body">
                 <div className="insights__wrapper-body-subs">
                <p>Posts</p>
                <div>
                <img src={Posts} alt="sub" />
                </div>
                </div>
                <div>
                    <h2>178</h2>
                </div>
            </div>
            <div className="insights__wrapper-body">
                <div className="insights__wrapper-body-subs">
                <p>Users reached</p>
                <div>
                <img src={Users} alt="sub" />
                </div>
                </div>
                <div>
                    <h2>10,069</h2>
                </div>
            </div>
      </div>
      <div className="insights__wrapper-bottom">
        <div className="insights__wrapper__bottom-header">
            <p>Account Activity</p>
            <div className='insights__wrapper__bottom-buttons'>
                <button className='last__week'><img src={Calendar} alt="sub" /> Last week</button>
                <button className='export'><img src={Export} alt="sub" /> Export</button>
            </div>
        </div>
        <div className="insights__wrapper__bottom-content">
            <div className="insights__wrapper__bottom-content-sub">

            </div>
            <div className="insights__wrapper__bottom-content-sub">
                <p>Overview</p>
                <div className="insights__overview-content">
                    <small>Users reached</small>
                    <div className='figures'>
                    <small>1647</small>
                    <span className='positive'>+2.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>New subscribers</small>
                    <div className='figures'>
                    <small>129</small>
                    <span className='negative'>-3.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Profile visits</small>
                    <div className='figures'>
                    <small>567</small>
                    <span className='positive'>+2.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Product posts</small>
                    <div className='figures'>
                    <small>56</small>
                     <span className='negative'>-3.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Blog posts</small>
                     <div className='figures'>
                    <small>56</small>
                     <span className='positive'>+2.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Link Clicks</small>
                     <div className='figures'>
                    <small>56</small>
                     <span className='negative'>-3.5%</span>
                    </div>
                </div>
            </div>
        </div>

        
      </div>
      <div className="insights__wrapper-bottom">
        <div className="insights__wrapper__bottom-header">
            <p>Facebook</p>
            <div className='insights__wrapper__bottom-buttons'>
                <button className='last__week'><img src={Calendar} alt="sub" /> Last week</button>
                <button className='export'><img src={Export} alt="sub" /> Export</button>
            </div>
        </div>
        <div className="insights__wrapper__bottom-content">
            <div className="insights__wrapper__bottom-content-sub">

            </div>
            <div className="insights__wrapper__bottom-content-sub">
                <p>Overview</p>
                <div className="insights__overview-content">
                    <small>Users reached</small>
                    <div className='figures'>
                    <small>1647</small>
                    <span className='positive'>+2.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>New subscribers</small>
                    <div className='figures'>
                    <small>129</small>
                    <span className='negative'>-3.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Profile visits</small>
                    <div className='figures'>
                    <small>567</small>
                    <span className='positive'>+2.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Product posts</small>
                    <div className='figures'>
                    <small>56</small>
                     <span className='negative'>-3.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Blog posts</small>
                     <div className='figures'>
                    <small>56</small>
                     <span className='positive'>+2.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Link Clicks</small>
                     <div className='figures'>
                    <small>56</small>
                     <span className='negative'>-3.5%</span>
                    </div>
                </div>
            </div>
        </div>

        
      </div>
    </div>
  )
}

export default Insights
