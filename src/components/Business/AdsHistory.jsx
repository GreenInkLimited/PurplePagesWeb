import React from 'react'
import {adshistory} from '../../data'
import Card from '../../UI/Card'

const AdsHistory = () => {
 return (
    <section className='adshistory'>
      <div className="adshistory">
        <div className="adshistory__header">
            <h4>Adverts History</h4>
            <p>Post an ad</p>
        </div>
      <div className=" adshistory__wrapper">
         {
            adshistory.map(({id, icon, title}) => {
                return (
                    <div className="adshistory__content" key={id }>
                       <img src={icon}/>
                        <p>{title}</p>
                    </div>
                )
            })
         }
      </div>
      </div>
    </section>
  )
}


export default AdsHistory