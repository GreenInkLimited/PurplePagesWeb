import React from 'react'
import Community from '../../components/Home/Community'
import Coverage from '../../components/Home/Coverage'
import Footer from '../../components/Footer'
import MainHeader from '../../components/Home/MainHeader'
import Programs from '../../components/Home/Programs'
import UsePurplePage from '../../components/Home/UsePurplePage'
import WhatWeDo from '../../components/Home/WhatWeDo'
import './home.css'
import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <MainHeader />
      <Coverage />
      <WhatWeDo />
      <Community />
      <Programs />
      <UsePurplePage />
      <Footer />
      
    </>
  )
}

export default Home