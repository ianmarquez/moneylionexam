import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  height: 3px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.5);
`;

const getProgressFromPath = ({ pathname } : any) : number => {
  console.log(pathname)
  switch (pathname) {
    case "/":
    case "/welcome":
      return 0;
    case "/personal":
      return 1;
    case "/dob":
      return 2;
    case "/agreement":
      return 3;
    default:
      return 0;
  }
}

const ProgressBarComponent: React.FunctionComponent = props => {
  const location = useLocation();
  const percentage = (getProgressFromPath(location) / 4) * 100;
  return <ProgressBarContainer style={{background: `linear-gradient(to right, #2ECFBF ${percentage}%, #B1B1B1 ${percentage - 100}%)`}}/>
}

export default ProgressBarComponent;