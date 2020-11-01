import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function SignUp({ display, showSignup, dataSend, soFetch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    } else {
      setEmail(event.target.value);
    }


  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dataSend({
      username: username,
      password: password,
      email: email
    });

  }

  return (
    <Modal
      show={display}
      onHide={() => showSignup(false)}
      centered
    >

      <form onSubmit={handleSubmit}>
        <label> Username
        <input
            name="username"
            value={username}
            onChange={handleChange}
          />
        </label>
        <label> Password
        <input
            name="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <label> Email
        <input
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <Button>Add Another Prompt</Button>
      </form>


      <Button onClick={showSignup}>Close</Button>

    </Modal>
  );
}


export default SignUp;