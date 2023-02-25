import React from 'react'
import AppNavbar from '../../components/AppNavBar'
import SingleProduct from '../../components/App/SingleProduct'
import './apphome.css'
import Footer from '../../components/Footer'
import Filter from '../../components/App/Filter'

const Home = () => {
  return (
    <>
      <AppNavbar />
      <SingleProduct />
      
      <Footer />
    </>
  )
}

export default Home