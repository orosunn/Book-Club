import React, { useState } from 'react';

function Contact() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    // handles changes to the input fields and updates state variables
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === 'name') {
        setName(value);
      } else if (name === 'email') {
        setEmail(value);
      } else if (name === 'message') {
        setMessage(value);
      }
    };
  
    // function for when user clicks in text field and then clicks out of text box with no text
    const handleInputBlur = (e) => {
      const { name, value } = e.target;
      if (!value) {
        setErrorMessage('Please fill out all fields!');
      }
    };
  
    // checks to see if any of the fields are empty, and displays error message if so
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      if (!name || !email || !message) {
        setErrorMessage('Please fill out all fields!');
        return;
      }
  
      // clear the forms after successful submit
      setName('');
      setEmail('');
      setMessage('');
      setErrorMessage('');
    };

    return (
        <div class="ui form">
        <div class="fields">
          <div class="field">
            <label>First name</label>
            <input type="text" placeholder="First Name" fdprocessedid="8v6ldv"/>
          </div>
          <div class="field">
            <label>Middle name</label>
            <input type="text" placeholder="Middle Name" fdprocessedid="biw33"/>
          </div>
          <div class="field">
            <label>Last name</label>
            <input type="text" placeholder="Last Name" fdprocessedid="i8nph"/>
          </div>
        </div>
      </div>
        )
    }
  
  
  export default Contact;