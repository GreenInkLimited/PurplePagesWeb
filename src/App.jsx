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
import Ads from './pages/ads/Ads'
import AdsDetails from './pages/ads/AdsDetails'
import Wishlist from './pages/wishlist/Wishlist'
import User from './pages/user/User'
import Features from './pages/features/Features'
import Terms from './pages/terns/Terms'
import Faqs from './pages/faq/Faqs'
import ContactUs from './pages/contact/ContactUs'
import Auth from './pages/auth/Auth'
import Verification from './pages/auth/Verification'
import Signin from './pages/auth/Signin'
import Interest from './pages/auth/Interest'
import PersonalAccount from './pages/personalAccount/PersonalAccount'
import UserEvents from './pages/user/UserEvents'
import CheckOut from './pages/events/CheckOut'

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
        <Route path='userevents' element={<UserEvents />} />
        <Route path='appblog' element={<Blog />} />
        <Route path='/appblog/:id' element={<BlogDetails />} />
        <Route path='apphome' element={<AppHome />} />
        <Route path='appads' element={<Ads />} />
        <Route path='features' element={<Features />} />
        <Route path='appwishlist' element={<Wishlist />} />
        <Route path='*' element={<Notfound />} />
        <Route path='/ads/:id' element={<AdsDetails />} />
        <Route path='/userprofile/:id' element={<User />} />
        <Route path='terms' element={<Terms />} />
        <Route path='faq' element={<Faqs />} />
        <Route path='contact' element={<ContactUs />} />
        <Route path='auth' element={<Auth />} />
        <Route path='verify' element={<Verification />} />
        <Route path='signin' element={<Signin/>} />
        <Route path='interest' element={<Interest/>} />
        <Route path='/personal/:id' element={<PersonalAccount/>} />
        <Route path='/checkout' element={<CheckOut/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App