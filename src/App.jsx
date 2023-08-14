import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Notfound from "./pages/notfound/Notfound";
import Events from "./pages/events/Events";
import EventDetails from "./pages/events/EventDetails";
import AppHome from "./pages/apphome/AppHome";
import Business from "./pages/apphome/Business";
import SingleProduct from "./pages/apphome/SingleProduct";
import Blog from "./pages/blog/Blog";
import BlogDetails from "./pages/blog/BlogDetails";
import HomeBlogDetails from "./pages/blog/HomeBlogDetails";
import Ads from "./pages/ads/Ads";
import AdsDetails from "./pages/ads/AdsDetails";
import Wishlist from "./pages/wishlist/Wishlist";
import User from "./pages/user/User";
import Features from "./pages/features/Features";
import Terms from "./pages/terns/Terms";
import Faqs from "./pages/faq/Faqs";
import ContactUs from "./pages/contact/ContactUs";
import Auth from "./pages/auth/Auth";
import Verification from "./pages/auth/Verification";
import Signin from "./pages/auth/Signin";
import Interest from "./pages/auth/Interest";
import PersonalAccount from "./pages/personalAccount/PersonalAccount";
import UserEvents from "./pages/user/UserEvents";
import CheckOut from "./pages/events/CheckOut";
import WriteBlog from "./components/Blog/WriteBlog";
import Verify from "./components/Modals/Verification";
import StepperForm from "./components/Modals/StepperForm";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-loading-skeleton/dist/skeleton.css";
import HomeBlog from "./pages/home/HomeBlog";
import PrivacyPolicy from "./pages/terns/PrivacyPolicy";
import RequestReset from "./pages/auth/RequestReset";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { gapi } from "gapi-script";
import UserEventDetails from "./pages/events/UserEventDetails";
import SuccessModal from "./components/Modals/SuccessModal";

const clientId =
  "901500469662-1c1vhjf4sqtentao8up1joi4bj4sn6qk.apps.googleusercontent.com";
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/user-events/:id" element={<UserEventDetails />} />
          <Route path="/business/:id" element={<Business />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="events" element={<Events />} />
          <Route path="userevents" element={<UserEvents />} />
          <Route path="appblog" element={<Blog />} />
          <Route path="/appblog/:id" element={<BlogDetails />} />
          <Route path="/blog/:id" element={<HomeBlogDetails />} />
          <Route path="apphome" element={<AppHome />} />
          <Route path="appads" element={<Ads />} />
          <Route path="features" element={<Features />} />
          <Route path="appwishlist" element={<Wishlist />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/ads/:id" element={<AdsDetails />} />
          <Route path="/userprofile/:id" element={<User />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="faq" element={<Faqs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="auth" element={<Auth />} />
          <Route path="verify" element={<Verification />} />
          <Route path="signin" element={<Signin />} />
          <Route path="interest" element={<Interest />} />
          <Route path="/personal" element={<PersonalAccount />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/writeblog" element={<WriteBlog />} />
          <Route path="/verification" element={<Verify />} />
          <Route path="/stepper" element={<StepperForm />} />
          <Route path="/blog" element={<HomeBlog />} />
          <Route path="/request-reset" element={<RequestReset />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/success" element={<SuccessModal />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
