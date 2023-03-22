import React from 'react'
import AdsContent from '../../components/Ads/AdsContent'
import Filter from '../../components/App/Filter'
import AppNavbar from '../../components/AppNavBar'
import Footer from '../../components/Footer'
import './ads.css'

const Ads = () => {
  return (
    <>
        <AppNavbar />
        <Filter />
        <AdsContent />
        <Footer />
    </>
  )
}

export default Ads
