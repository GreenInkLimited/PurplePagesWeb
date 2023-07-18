import React from 'react'
import Posts from '../../assets/Posts.png'
import Users from '../../assets/UserReached.png'
import Sub from '../../assets/Subscribers.png'
import Export from '../../assets/export.png'
import Calendar from '../../assets/Calendar.png'
import { getMyBusinessById } from '../../apis/BusinessApi'
import { Bar } from 'react-chartjs-2'
import { Chart, LinearScale, CategoryScale, BarElement} from 'chart.js';
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
Chart.register(
    LinearScale,
    CategoryScale, 
    BarElement
)

const labels = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
const data = {
    labels,
    datasets : [
        {
            label: 'Likes',
            data: ['300', '300', '300', '300', '300', '300', '300'],
            backgroundColor: '#650585',
            borderRadius: 50,
        },
        {
            label: 'Subscribers',
            data: ['400', '400', '400', '400', '400', '400', '400'],
            backgroundColor: '#BDBDBD',
            borderRadius: 50,
        },
        {
            label: 'Saved Posts',
            data: ['500', '500', '500', '500', '500', '500', '500'],
            backgroundColor: '#C42AF7',
            borderRadius: 50,
        }
        
    ]
}



const Insights = () => {
    const { id } = useParams();

    const { data: business, isLoading } = useQuery('business', () => getMyBusinessById({ id }));

    const subscriptionCount = business?.subscriptions?.length || 0;
    const postCount = business?.products?.length + business?.blogs?.length || 0;
    const blogCount = business?.blogs?.length || 0;
    const productCount = business?.products?.length || 0;
  return (
    <div className='insights__container'>
      <div className="insights__wrapper-top">
            <div className="insights__wrapper-body">
                <div className="insights__wrapper-body-subs">
                <p>Subscribers</p>
                <div className='insights__image-container'>
                <img src={Sub} alt="sub" />
                </div>
                </div>
                <div>
                    <h2>{subscriptionCount}</h2>
                </div>
            </div>
            <div className="insights__wrapper-body">
                 <div className="insights__wrapper-body-subs">
                <p>Posts</p>
                <div className='insights__posts-container'>
                <img src={Posts} alt="sub" />
                </div>
                </div>
                <div>
                    <h2>{postCount}</h2>
                </div>
            </div>
            <div className="insights__wrapper-body">
                <div className="insights__wrapper-body-subs">
                <p>Users reached</p>
                <div  className='insights__users-container'>
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
            <h2>Account Activity</h2>
            <div className='insights__wrapper__bottom-buttons'>
                <button className='last__week'><img src={Calendar} alt="sub" /> Last week</button>
                <button className='export'><img src={Export} alt="sub" /> Export</button>
            </div>
        </div>
        <div className="insights__wrapper__bottom-content">
            <div className="insights__wrapper__bottom-content-suba">
                <div className="insights__labels">
                    <div className="insightd__label-wrapper">
                        <div className='dot'></div>
                        <small>Likes</small>
                    </div>
                <div className="insightd__label-wrapper">
                    <div className='saved__posts'></div>
                    <small>Saved Posts</small>
                </div>
                <div className="insightd__label-wrapper">
                    <div className='subscribers'></div>
                    <small>Subscribers</small>
                </div>
                </div>
                <Bar data={data}/>
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
                    <small>{subscriptionCount}</small>
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
                    <small>{productCount}</small>
                     <span className='negative'>-3.5%</span>
                    </div>
                </div>
                <div className="insights__overview-content">
                    <small>Blog posts</small>
                     <div className='figures'>
                    <small>{blogCount}</small>
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
