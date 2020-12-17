import React, { useEffect } from "react";
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';

const Profile = ({ setCurrentUser, getUserRecords, currentUser }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Wrapper>
      <Status>Loading ...</Status>
      <LoginButton />
    </Wrapper>;
  }

  if (!user) {
    return <Wrapper>
      <Status>Not Sign In </Status>
      <LoginButton />
    </Wrapper>
  }
  useEffect(() => {
    if (user) {
      setCurrentUser(user.name);
      getUserRecords();
    }
  }, [currentUser])


  return (
    isAuthenticated && (
      <Wrapper>
        <Image src={user.picture} alt={user.name} /> <Status>{user.name}</Status>
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
const Status = styled.h5`
margin-right: 2em;
vertical-align: middle;
`;
const ButtonWrapper = styled.div`

`;
const Image = styled.img`
margin-right: 1em;
height: 60px;
width: 60px;
`;
