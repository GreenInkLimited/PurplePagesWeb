import React from "react";
import "./notification.css";
import { notifications } from "../data";
import Click from "../assets/click.png";
import { Link, useNavigate } from "react-router-dom";

const Notification = () => {
  const navigate = useNavigate();
  return (
    <div className="notification">
      <ul>
        <div className="notification__header">
          <h4>Notifications</h4>
          <small>Mark all as read</small>
        </div>
        <hr />
        {notifications.length === 0 ? (
          <div className="notification__body">
            <li>
              <p className="notification__body-paragraph">
                No notifications yet!
              </p>
              <p className="notification__body-paragraph-sub">
                Your notifications will appear here
              </p>
            </li>
            <Link to="/personal">
              <button className="notification__body-paragraph-button">
                View/edit preferences
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="notification__body">
              <li>
                <p>New</p>
              </li>
              {notifications.map(({ id, icon, name, message, time }) => (
                <div className="notification__content-new" key={id}>
                  <div>
                    <img className="sender" src={icon} alt="icon" />
                  </div>
                  <div className="notification__content-left">
                    <div>
                      <p>
                        <span>{name}</span> {message}
                      </p>
                      <small>{time}</small>
                    </div>
                    <img className="click" src={Click} />
                  </div>
                </div>
              ))}
            </div>

            <div className="notification__body">
              <li>
                <p>Older</p>
              </li>
              {notifications.map(({ id, icon, name, message, time }) => (
                <div className="notification__content-new" key={id}>
                  <div>
                    <img className="sender" src={icon} alt="icon" />
                  </div>
                  <div className="notification__content-left">
                    <div>
                      <p>
                        <span>{name}</span> {message}
                      </p>
                      <small>{time}</small>
                    </div>
                    <img className="click" src={Click} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default Notification;
