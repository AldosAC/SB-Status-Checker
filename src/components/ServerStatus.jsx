import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { url } from '../config.js';

const ServerStatus = (props) => {
  const [ serverStatus, setServerStatus ] = useState({});
  const { status, lastReset } = serverStatus;
  const lastResetString = new Date(lastReset).toLocaleString();
  let statusIndicator = '';
  let lastResetIndicator = '';

  const getStatus = () => {
    axios.get(`${url}/api/status`)
      .then(({ data }) => setServerStatus(data))
      .catch((err) => console.log(err));

    setTimeout(getStatus, 5000)
  }

  useEffect(() => {
    getStatus()
  }, []);

  if (status === 'ONLINE') {
    statusIndicator = (<ServerOnline>Online</ServerOnline>)
  } else if (status === 'OFFLINE') {
    statusIndicator = (<ServerOffline>Offline</ServerOffline>)
  }

  if (lastReset.length > 0) {
    lastResetIndicator = (
      <LastResetContainer>
        Server last come online at {lastResetString}
      </LastResetContainer>
    )
  }

  return (
    <StatusContainer>
      <Header>
        Shadowbane Server Status
      </Header>
      <IndicatorContainer>
        {statusIndicator}
        {}
      </IndicatorContainer>
    </StatusContainer>
  )
}

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;
const Header = styled.div`
  font-size: 60px;
`;
const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 500px;
`;
const ServerOnline = styled.div`
  color: green;
  text-align: center;
  font-size: 120px;
`;
const ServerOffline = styled.div`
  color: red;
  text-align: center;
  font-size: 120px;
`;
const LastResetContainer = styled.div`
  margin-top 10px;
  font-size: 32px;
  text-align: center;
`;

export default ServerStatus;