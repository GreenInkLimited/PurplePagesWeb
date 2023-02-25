import React from 'react'
import Background from "../../assets/bg.png"

const Community = () => {
  return (
     <header className='header'>
        <div className="header__container">
            <div className="header__container-bg">
                <img src={Background} alt="community bg" />
            </div>
            <div className="header__content">
                <h2>The Purple Pages Community</h2>
                <p>Purple Pages is committed to serve SMEs across the nation. We have an engaged community of diverse professionals and business owners that benefit from our premium value offerings.</p>
            </div>
            <div className='subheader__content'>
                <div className='community__size-container'>
                    <h2>00000</h2>
                    <p>Number of users</p>
                </div>
                <div className='community__size-container'>
                    <h2>100</h2>
                    <p>SMEs</p>
                </div>
                <div className='community__size-container'>
                    <h2>100</h2>
                    <p>Social following</p>
                </div>
            </div>
        </div>
    </header>

  )
}

export default Community