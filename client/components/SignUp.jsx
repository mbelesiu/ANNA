import React, { useState } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Modal, Button } from 'react-materialize';


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
    <Modal
      bottomSheet={false}
      fixedFooter={false}
      header="Welcome to ANNA"
      id="Modal-0"
      open={true}
      options={{
        dismissible: true,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      }}
    >
      <h4>Please login with exisiting email, or sign up with new email</h4>
      <form onSubmit={handleSubmit}>
        <label> Email
        <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button>Login or Signup</button>
      </form>
    </Modal>

  );
}

// const Modal = styled.div`

//   position: fixed;
//   z-index: 1;
//   padding-top: 100px;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   background-color: rgb(0,0,0);
//   background-color: rgba(0,0,0,0.4);
// `;

// const ModalContent = styled.div`
//   background-color: #fefefe;
//   margin: auto;
//   padding: 20px;
//   border: 1px solid #888;
//   width: 80%;
// `;


export default SignUp;