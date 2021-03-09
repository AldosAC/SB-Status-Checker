import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';
import { subscribe, unsubscribe } from '../controllers/subscriptionControllers.js';

const EmailManagement = (props) => {
  const [ email, setEmail ] = useState('');

  const onChangeHandler = ({ target: { value }}) => setEmail(value);

  const resetEmail = () => setEmail('');

  const subscribeSubmitHandler = () => {
    if (isEmail(email)) {
      subscribe(email)
        .then(() => {
          console.log(`Successfully subscribed: ${email}`)
          resetEmail();
        })
        .catch((err) => console.log(`Error subscribing: ${email}`));
    } else {
      console.log(`Invalid email: ${email}`);
    }
  }

  const unSubscribeSubmitHandler = () => {
    if (isEmail(email)) {
      unsubscribe(email)
        .then(() => {
          console.log(`Successfully unsubscribed: ${email}`)
          resetEmail();
        })
        .catch((err) => console.log(`Error unsubscribing: ${email}`));
    } else {
      console.log(`Invalid email: ${email}`);
    }
  }

  return (
    <Container>
      <Header>Email Notifications</Header>
      <Input 
        value={email} 
        placeholder='Enter your email address for real-time updates'
        onChange={onChangeHandler} 
      ></Input>
      <ButtonContainer>
        <SubButton onClick={subscribeSubmitHandler}>Subscribe</SubButton>
        <UnSubButton onClick={unSubscribeSubmitHandler} >Unsubscribe</UnSubButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Header = styled.h3`

`;
const Input = styled.input`
  box-sizing: border-box;
  margin: 0;
  padding: 4px;
  width: 400px;
  height: 32px;
  margin-bottom: 6px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const SubButton = styled.button`
  padding: 4px;
  width: 197px;
  height: 32px;
  margin-right: 6px;
`;
const UnSubButton = styled.button`
  padding: 4px;
  width: 197px;
  height: 32px;
  margin: 0;
`;

export default EmailManagement;