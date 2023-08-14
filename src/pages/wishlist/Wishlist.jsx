import { useState } from "react";
import "./wishlist.css";
import BlogPostWishList from "../../components/Wishlist/BlogPostWishList";
import ProductWishlist from "../../components/Wishlist/ProductWishlist";
import Footer from "../../components/Footer";
import AppNavbar from "../../components/AppNavBar";
import { RiShareForwardLine } from "react-icons/ri";

function Wishlist() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <AppNavbar />
      <div className="wishlist-container  container">
        <div className="wishlist__bloc-tabs">
          <h4>Wishlist</h4>
          <button
            className={
              toggleState === 1
                ? "wishlist__tabs active-wishlist__tabs"
                : "wishlist__tabs"
            }
            onClick={() => toggleTab(1)}
          >
            Products
          </button>
          <button
            className={
              toggleState === 2
                ? "wishlist__tabs active-wishlist__tabs"
                : "wishlist__tabs"
            }
            onClick={() => toggleTab(2)}
          >
            Blogposts
          </button>
        </div>

        <div className="wishlist__content-tabs">
          <div
            className={
              toggleState === 1
                ? "wishlist__contentx  active-wishlist__content"
                : "wishlist__contentx"
            }
          >
            <div className="first__wishlist-content">
              <h3>Products</h3>
              <div className="first__wishlist-share">
                <RiShareForwardLine className="icon" />
                <p>share</p>
              </div>
            </div>

            <ProductWishlist />
          </div>

          <div
            className={
              toggleState === 2
                ? "wishlist__contentx  active-wishlist__content"
                : "wishlist__contentx"
            }
          >
            <div className="first__wishlist-content">
              <h3>Blogposts</h3>
              <div className="first__wishlist-share">
                <RiShareForwardLine className="icon" />
                <p>share</p>
              </div>
            </div>
            <BlogPostWishList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
