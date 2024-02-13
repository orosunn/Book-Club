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
        
        <div className="ui form contact-form">
            <h1 className="contact-header">Get in Touch!</h1>
            <div className="two fields contact-fields">
                <div className="field-contact">
                    <label className="label-contact">First name</label>
                    <input type="text" placeholder="First Name" value={name} onChange={handleInputChange} name="name" onBlur={handleInputBlur} />
                </div>
                <div className="field-contact">
                    <label className="label-contact">Email</label>
                    <input type="text" placeholder="Email" value={email} onChange={handleInputChange} name="email" onBlur={handleInputBlur} />
                </div>
            </div>
            <div className="field-contact">
                <label className="label-contact">Message</label>
                <textarea value={message} onChange={handleInputChange} name="message"></textarea>
            </div>
            {errorMessage && <div className="ui red message">{errorMessage}</div>}
            <button className="ui button contact-btn" onClick={handleFormSubmit}>Submit</button>
        </div>
    )
}

export default Contact;