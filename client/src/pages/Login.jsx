import { useState } from 'react';
import { Link } from 'react-router-dom';

//once the mutations.js file gets polished, uncomment these things
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [Login, { error, data }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await Login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
      <div>
        <div className="login-page">
          <h1 className="login-header">Login</h1>
          <div className="login-form">
            <form className="ui form" onSubmit={handleFormSubmit}>
              <div className="field-login">
                <h3 className='label-login'>Email</h3>
                <input className="input" type="email" name="email" placeholder="Email" value={formState.email}
                  onChange={handleChange} />
              </div>
              <div className="field-login">
                <h3 className='label-login'>Password</h3>
                <input className="input" type="password" name="password" placeholder="******" value={formState.password}
                  onChange={handleChange} />
              </div>
              <button className="ui button" id="login-btn" onClick={handleFormSubmit}>Login</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
