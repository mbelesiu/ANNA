import React, {useEffect} from "react";
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';

const Profile = ({ setCurrentUser, getUserRecords, currentUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Wrapper>Loading ...
      <LoginButton />
    </Wrapper>;
  }

  if (!user) {
    return <Wrapper>
      <h5>Not Sign In </h5>
      <LoginButton />
    </Wrapper>
  }
  useEffect(()=>{
    if(user){
      setCurrentUser(user.name);
      getUserRecords();
    }
  },[currentUser])


  return (
    isAuthenticated && (
      <Wrapper>
        <Image src={user.picture} alt={user.name} /> <h5>{user.name}</h5>
        <LogoutButton />
      </Wrapper>
    )
  );
};

export default Profile;

const Wrapper = styled.div`
display: flex;
float: right;
margin-right: 2em;
`;
const Image = styled.img`
margin-right: 1em;
height: 60px;
width: 60px;
`;

//Test component to see how the user auth works in terms of retrieving data.