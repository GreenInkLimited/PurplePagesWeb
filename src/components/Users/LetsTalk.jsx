import React, {useRef} from 'react'
import styled from "styled-components";

const LetsTalk = () => {
    const form = useRef();
  return (
    <StyledContactForm>
      <form ref={form}>
        <label>Name</label>
        <input type="text" name="user_name" placeholder='placeholder text'/>
        <label>Email</label>
        <input type="email" name="user_email" placeholder='placeholder text'/>
        <label>Message</label>
        <textarea name="message" placeholder='What seems to be the problem?'/>
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
  )
}

export default LetsTalk;

const StyledContactForm = styled.div`
    width: 400px;
    form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    input {
    width: 100%;
    height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    
    }
    }
    textarea {
        max-width: 100%;
        min-width: 100%;
        width: 100%;
        height: 260px;
        padding: 7px;
        outline: none;
        font-family: 'avenir-lt-45-book';
        border-radius: 5px;
        border: 1px solid rgb(220, 220, 220);
    }
    label {
        margin-top: 1rem;
        font-family: 'avenir-lt-45-book';
    }
    input[type="submit"] {
        font-family: 'avenir-lt-45-book';
        margin-top: 2rem;
        cursor: pointer;
        background: #650585;
        color: white;
        border: none;
    }
    input::placeholder, textarea::placeholder {
        color: #E0E0E0;
        font-family: 'avenir-lt-45-book';
        font-size: 12px,
    }
}
`;
