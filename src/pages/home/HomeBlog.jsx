import React from 'react'
import Footer from '../../components/Footer'
import Filter from '../../components/App/Filter'
import Navbar from '../../components/Navbar'
import HomeBlogContent from '../../components/Blog/HomeBlogContent'


const HomeBlog = () => {
  return (
    <>
      <Navbar />
      <Filter />
      <HomeBlogContent />
      <Footer />
    </>
  )
}

export default HomeBlog