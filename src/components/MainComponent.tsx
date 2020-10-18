import React from 'react';
import styled from 'styled-components';
import { MainPage } from '../styles/common';

const LogoContainer = styled.div`
  text-align: center;
  height: 60px;
  margin: 20px auto 0px
`;

const MainComponent: React.FunctionComponent = props => {  
  
  return <MainPage>
    <LogoContainer>
      <img src='../assets/logo.svg' alt='moneylion company logo'/>
    </LogoContainer>
    {props.children}
  </MainPage>
}


export default MainComponent;