import { useState } from 'react';
import  { validateEmail } from '../utils/helpers';

function SignUp() {
    //useState hooks that will keep track of the form input values and errorMessages
    const [name, setName ] = useState('');
    const [email, setEmail ] =useState('');
    const [password, setPassword ] =useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value.trim() === '') {
          setErrorMessage(`${name} field is required`);
        }
      };


const handleInputChange = (e) => {
    const { name, value } = e.target;
    //Clear error message when user starts typing
    setErrorMessage('');

    //implement switch statement
}


    return (
        <>
        <h1>Sign Up</h1>
        <form onSubmit="{handleSignUp}"></form>

        <input 
        value={name}
        name="name"
        onChange={handleInputChange}
        onBlur={handleBlur}
        type="text" placeholder="Your Name"

        />

        <input
          value={email}
          name="email"
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="email" placeholder="Email"
        />


        <input
          value={password}
          name="password"
          onChange={handleInputChange}
          onBlur={handleBlur}
          type="password" placeholder="Password"
        />


        </>
    )
}
