import React, { useState } from 'react';

function SignUp({ showSignup, dataSend, soFetch }) {
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
      <button>Add Another Prompt</button>
    </form>
  )
}


export default SignUp;