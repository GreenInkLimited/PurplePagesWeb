import React, { useEffect, useState } from "react";
import { getBusinessCount, getUserCount } from "../../apis/BusinessApi";

const Community = () => {
  const [count, setCount] = useState("");
  const [userCount, setUserCount] = useState("");

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await getBusinessCount();
        //console.log('Response:', response);
        const countValue = response?.count ?? 0;

        let formattedCount;
        if (countValue < 999) {
          formattedCount = countValue.toString().padStart(4, "0");
        } else {
          formattedCount = countValue.toString();
        }

        setCount(formattedCount);
      } catch (error) {
        console.log("Error fetching business count:", error);
      }
    };

    fetchCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await getUserCount();
        //console.log('Response:', response);
        const countValue = response?.signup_count ?? 0;

        let formattedCount;
        if (countValue < 999) {
          formattedCount = countValue.toString().padStart(4, "0");
        } else {
          formattedCount = countValue.toString();
        }

        setUserCount(formattedCount);
      } catch (error) {
        console.log("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="community">
      <div className="community__container">
        <div className="community__container-bg"></div>
        <div className="community__content">
          <h2>The Purple Pages Community</h2>
          <p>
            Purple Pages is committed to serving SMEs across the nation. We have
            an engaged community of diverse professionals and business owners
            that benefit from our premium value offerings.
          </p>
        </div>
        <div className="subheader___content">
          <div className="community___size-container">
            <h2>{userCount}</h2>
            <p>Number of users</p>
          </div>
          <div className="community___size-container">
            <h2>{count}</h2>
            <p>SMEs</p>
          </div>
          <div className="community___size-container">
            <h2>0700</h2>
            <p>Social following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
