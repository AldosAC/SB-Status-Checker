import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { url } from '../config.js';

const ServerStatus = (props) => {
  const [ serverStatus, setServerStatus ] = useState({});
  const { status, lastReset } = serverStatus;
  const lastResetString = lastReset === 'Unknown' ? '' : new Date(Number(lastReset)).toLocaleString();
  let statusIndicator = '';
  let lastResetIndicator = '';

  console.log(`lastReset: ${lastReset}`);
  console.log(`lastResetString: ${lastResetString}`);

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

  if (lastReset && lastReset.length > 0) {
    lastResetIndicator = (
      <LastResetContents>
        Server last come online {lastResetString}
      </LastResetContents>
    )
  }

  return (
    <StatusContainer>
      <Header>
        Shadowbane Server Status
      </Header>
      <IndicatorContainer>
        {statusIndicator}
      </IndicatorContainer>
      <LastResetContainer>
        {lastResetIndicator}
      </LastResetContainer>
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
  flex-direction: column;
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
const LastResetContents = styled.div`
  font-size: 24px;
  text-align: center;
`;
const LastResetContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0;
`;

export default ServerStatus;