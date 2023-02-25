import React from 'react'
import AppNavbar from '../../components/AppNavBar'
import Footer from '../../components/Footer'
import Filter from '../../components/App/Filter'
import BlogContent from '../../components/Blog/BlogContent'
import './blog.css'

const Blog = () => {
  return (
    <>
      <AppNavbar />
      <Filter />
      <BlogContent />
      <Footer />
    </>
  )
}

export default Blog