import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { url } from '../config.js';

const ServerStatus = (props) => {
  const [ status, setStatus ] = useState('');

  const updateStatus = (status) => {
    setStatus(status);
  }

  const getStatus = () => {
    axios.get(`${url}/api/status`)
        .then(({ data }) => updateStatus(data))
        .catch((err) => console.log(err));

    setTimeout(() => {
      axios.get(`${url}/api/status`)
        .then(({ data }) => updateStatus(data))
        .catch((err) => console.log(err));
    }, 5000)
  }

  useEffect(() => {
    getStatus()
  }, []);

  return (
    <StatusContainer>
      <ServerOnline />
      <ServerOffline />
    </StatusContainer>
  )
}

const StatusContainer = styled.div`
  display: flex;
  margin: 0;
`;
const ServerOnline = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background-color: green;
`;
const ServerOffline = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background-color: red;
`;

export default ServerStatus;