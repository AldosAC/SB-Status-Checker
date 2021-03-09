import React from 'react';
import styled from 'styled-components';

const About = (promps) => {
  return (
    <Container>
      <Info>
        Brought to you by Joel Carpenter and the lovable fucks over at Thief Kings
      </Info>
      <GitHub href="https://github.com/AldosAC">
        Check out more of my work here.
      </GitHub>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Info = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  color: grey;
  margin-bottom: 3px;
`;
const GitHub = styled.a`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  color: rgb(56,56,56);
  font-style: normal;
`;

export default About;