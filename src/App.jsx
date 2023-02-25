import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import React from 'react'
import About from './pages/about/About'
import Home from './pages/home/Home'
import Notfound from './pages/notfound/Notfound'
import Trainers from './pages/trainers/Trainers'
import Events from './pages/events/Events'
import EventDetails from './pages/events/EventDetails'
import AppHome from './pages/apphome/AppHome'
import Business from './pages/apphome/Business'
import SingleProduct from './pages/apphome/SingleProduct'
import Blog from './pages/blog/Blog'
import BlogDetails from './pages/blog/BlogDetails'

const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='/events/:id' element={<EventDetails />} />
        <Route path='/business/:id' element={<Business />} />
        <Route path='/singleproduct/:id' element={<SingleProduct />} />
        <Route path='events' element={<Events />} />
        <Route path='appblog' element={<Blog />} />
         <Route path='/appblog/:id' element={<BlogDetails />} />
        <Route path='apphome' element={<AppHome />} />
        <Route path='trainers' element={<Trainers />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App