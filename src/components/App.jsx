import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ServerStatus from './ServerStatus.jsx';

const App = (props) => {
  return (
    <React.Fragment>
      <Wrapper />
      <ServerStatus />
    </React.Fragment>
  )
}

const Wrapper = createGlobalStyle`
body {
  background: #ece9e6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
`

export default App;