import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';

const EmailManagement = (props) => {
  const [ email, setEmail ] = useState('');

  const inputRef = useRef();

  const onChangeHandler = ({ target: { value }}) => setEmail(value);

  return (
    <Container>
      <Header>Email Notifications</Header>
      <Input 
        ref={inputRef} 
        value={email} 
        placeholder='Enter your email address for real-time updates'
        onChange={onChangeHandler} 
      ></Input>
      <ButtonContainer>
        <SubButton>Subscribe</SubButton>
        <UnSubButton>Unsubscribe</UnSubButton>
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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