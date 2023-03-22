import React, {useRef} from 'react'
import Logo from '../../assets/pplogo.png'
import {interest} from '../../data'
import {AiOutlinePlus} from 'react-icons/ai'
import './auth.css'


const Interest = () => {
    const form = useRef();
  return (
    <div className='container interest__wrapper'>
    <div className="container signup_wrapper">
        <div className="signup__content">
            <img src={Logo} alt="logo" />
            <h1>What are you interested in?</h1>
                <div className="signup_paragraph">
        <p>Choose 3 or more to continue</p>
        </div>
    </div>
    </div>
    <div className='all__interests'>
         {
            interest.map(({id, name}) => {
                return (
        <div className="interest__categories" key={id }>
            <div className='interest__content'>
            <p>{name}</p>
            <AiOutlinePlus />
            </div>
        </div>
        )
            })
         }
    </div>
    <button className='submit'>Go Home</button>
    </div>
    
  )
}

export default Interest