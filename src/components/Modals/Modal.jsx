import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineCancel } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './modal.css';
import { getEventById, BuyTicket } from '../../apis/EventsApis';
import { useMutation } from 'react-query';

const Modal = ({ closeModal }) => {
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ticketCount, setTicketCount] = useState(1); // State for the number of tickets

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvents(eventData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);



  // Function to handle increasing the ticket count
  const increaseTicketCount = () => {
    setTicketCount(prevCount => prevCount + 1);
  };

  // Function to handle decreasing the ticket count
  const decreaseTicketCount = () => {
    if (ticketCount > 1) {
      setTicketCount(prevCount => prevCount - 1);
    }
  };

  const { mutateAsync, isLoading } = useMutation('buy ticket', BuyTicket, {
    onSuccess: () => {
      closeModal();
    },
    onError: (error) => {
      console.error('Failed to add blog:', error);
    },
  });

  const initialValues = {
    quantity: '',
    first_name: '',
    last_name: '',
    email: '',
    id: id,
  };

  const handleSubmit = (values) => {
  const { first_name, last_name, email, id } = values;
  const updatedValues = {
    quantity: ticketCount, // Include the ticketCount value
    first_name,
    last_name,
    email,
    id
  };
  mutateAsync(updatedValues);
};

  return (
    <div className='modal__background'>
      {events && (
        <div className="modal__container">
          <div className="modal__header">
            <div className="modal__title">
              <img src={`https://api.usepurplepages.com/${events.event_flier}`} alt="Event Flier" />
              <div className='model__text'>
                <h4>{events.event_name}</h4>
                <p>
                  {events.days} | {events.start_time} -{' '}
                  {events.end_time}
                </p>
                <small>{events.event_location}</small>
              </div>
            </div>
            <AiOutlineClose className='close__my-modal__mobile' onClick={() => closeModal(false)} />
            <AiOutlineClose className='close__my-modal' onClick={() => closeModal(false)} />
          </div>
          <h2>Ticket Information</h2>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
          <div className="modal__body">
            <div className="modal__body-left">
              <p>How many tickets do you want to buy</p>
              <div className="modal__inrease-desrease">
                <div className="modal__decreament" onClick={decreaseTicketCount}>
                  <AiOutlineMinus />
                </div>
                <p>{ticketCount}</p>
                <div className="modal__increament" onClick={increaseTicketCount}>
                  <AiOutlinePlus />
                </div>
              </div>
              <div className="subtotal_update">
                <p>Subtotal: ₦{events.ticket_price * ticketCount}</p>
              </div>
              
              <label className='label'>First Name <small>(required)</small></label>
              <Field className='modal__input' type="text" name="first_name" placeholder='Enter your first name' />
              <label className='label'>Last Name <small>(required)</small></label>
              <Field className='modal__input' type="text" name="last_name" placeholder='Enter your last name' />
              <label className='label'>Email <small>(required)</small></label>
              <Field className='modal__input' type="email" name="email" placeholder='Enter your email' />
            </div>
            <div className="modal__xbody-left">
              <h4>Summary</h4>
              <p>{ticketCount} x {events.event_name}</p>
              <div className="modal__payment-sumary">
                <div className="modal__payment-info">
                  <div className="modal_subtotal">
                    <p>Sub-total</p>
                    <p>₦{events.ticket_price * ticketCount}</p>
                  </div>
                  <div className="modal_subtotal">
                    <p>Service charge</p>
                    <p>₦40</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="modal__total">
                <p>Total</p>
                <p className='total__madal-price'><b>₦{events.ticket_price * ticketCount + 40}</b></p>
              </div>
            </div>
          </div>
          <div className="modal__footer">
            
              <button className="" type='submit'>proceed</button>
            
          </div>
          </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Modal;