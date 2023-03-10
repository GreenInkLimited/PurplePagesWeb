import React from 'react'
import Image from '../../assets/image.png';
import {values} from '../../data';
import Card from '../../UI/Card'; 
import SectionHead from '../SectionHead';

const WhatWeDo = () => {
  return (
    <section className='values'> 
        <div className="container">
            <SectionHead title="What we do at Purple Pages" paragraph="We offer SMEs a stack of digital marketing services they need to optimize business growth and productivity."/>
           <div className="values__container">
            <div className="values__left">
                <div className="values__image">
                    <img src={Image} alt="what we do" /> 
                </div>
            </div>
            <div className="values__right">
                <div className='values__wrapper'>
                    {
                        values.map(({id,icon,title,desc}) => {
                            return <Card className="values__value" key={id}>
                                <img src={icon} alt="icon"/>
                                <h4>{title}</h4>
                                <small>{desc}</small>
                            </Card>
                        })
                    }
                </div>
            </div>
        </div>
        </div>
    </section>
  )
}

export default WhatWeDo