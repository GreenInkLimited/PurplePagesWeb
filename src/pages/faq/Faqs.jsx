import React, {useState} from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import './faqs.css'
import {RiArrowDropDownLine, RiArrowDropUpLine} from 'react-icons/ri'
import {faqs} from '../../data'

const Faqs = () => {
    const [selected, setSelected] = useState(null)
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }
  return (
    <>
        <Navbar />
        <div className="container faqs">
            <h2>Frequently Asked Questions</h2>
            <div className="faqs__wrapper">
             {
                faqs.map((item, i) => {
                    return (
                <div className="accordion">
                    <div className="item">
                        <div className="title" onClick={() => toggle(i)}>
                    <p><b>{item.question}</b></p>
                    <span>{ selected === i ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}</span>
                    </div>
                    <div className={ selected === i ? ' accordion__content show' : 'accordion__content'}>
                        <p>{item.answer} </p>
                    </div>
                    
                   </div>    
                </div>
                    )
                 })
             }  
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Faqs
