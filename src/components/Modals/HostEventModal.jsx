import React, {useState, useRef} from 'react'
import './modal.css'
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import HostYourEvent from './HostYourEvent';
import {BiArrowBack} from 'react-icons/bi'


const HostEventModal = ({closeModal}) => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    nationality: "",
    other: "",
  });

  const FormTitles = ["Let’s get you started", "Personal Info", "Other"];

  const PageDisplay = () => {
    if (page === 0) {
      return <HostYourEvent formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="host-modal__background form">
        
      <div className="progressbar">
        <div
          style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="host-modal__container">
        <div className='host-modal__container-back'>
            <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            <BiArrowBack /> Back
          </button>
        </div>
        <div className="">
          <h2>{FormTitles[page]}</h2>
        </div>
        <div className="bod">{PageDisplay()}</div>
        <div className="">
          
          <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
           <div className="modal__footer">
                
                    <button onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}>proceed</button>
               
            </div>
        </div>
      </div>
      
    </div>
  );
}

export default HostEventModal