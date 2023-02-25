import React from 'react'
import AppNavbar from '../../components/AppNavBar'
import Products from '../../components/App/Products'
import './apphome.css'
import Footer from '../../components/Footer'
import Filter from '../../components/App/Filter'

const Home = () => {
  return (
    <>
      <AppNavbar />
      <Filter />
      <Products />
      <Footer />
    </>
  )
}

export default Home