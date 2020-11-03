import React, { useState } from 'react';

import styled from 'styled-components';

function SignUp({ display, showSignup, dataSend }) {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');



  const handleSubmit = (event) => {
    event.preventDefault();
    dataSend(email);
    showSignup(false);
  }

  if (!display) {
    return null;
  }

  return (
    <Modal>
      <ModalContent>
        <h2>Welcome to ANNA</h2>
        <h4>Please login with exisiting email, or sign up with new email</h4>
        <form onSubmit={handleSubmit}>
        <label> Email
        <input
              name="email"
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </label>
          <button>Login or Signup</button>
        </form>
      </ModalContent>
    </Modal>

  );
}

const Modal = styled.div`

  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;


export default SignUp;