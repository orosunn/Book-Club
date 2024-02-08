import { useState } from 'react';
import { validateEmail } from '../utils/helpers';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function SignUp() {
    //useState hooks that will keep track of the form input values and errorMessages
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
    });
    

    const [addUser, { error, data }] = useMutation(ADD_USER);


    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (value.trim() === '') {
            setErrorMessage(`${name} field is required`);
        }

        setFormState({
            ...formState,
            [name]: value,
        });

    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //Clear error message when user starts typing
        setErrorMessage('');

        //implement switch statement
        switch (name) {
            case 'name': setName(value);
                break;
            case 'email': setEmail(value);
                if (!validateEmail(value) && value.trim() !== '') {
                    setErrorMessage("Email is invalid");
                }
                break;
            case 'password': setPassword(value);
                break;
            default:
                break;
        }
    };

    // Comment in once backend set up
    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log(formState);

    //     try {
    //       const { data } = await addUser({
    //         variables: { ...formState },
    //       });

    //       Auth.login(data.addUser.token);
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   };


    return (
        <>
            <h1>Sign Up</h1>
            <form onSubmit={handleFormSubmit}>

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

                <button type="submit">
                    Sign Up
                </button>
            </form>


        </>
    )
}
