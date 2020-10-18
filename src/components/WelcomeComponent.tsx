import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { StyledButton, StyledContainer } from '../styles/common';
import ProgressBarComponent from './ProgressBarComponent';

const WelcomeComponent: React.FunctionComponent = () => {
  const history = useHistory();
  
  useEffect(() => {
    const lastPage = window.localStorage.getItem('lastPage');
    if(lastPage) {
      history.push(lastPage);
    }
  });

  return <>
    <ProgressBarComponent/>
    <StyledContainer>
      <h1>Say Hello to Moneylion</h1>
      <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim, dui vitae fringilla condimentum, lorem neque semper urna, et aliquam.</h3>
      <StyledButton onClick={() => history.push('/personal')}>Apply Now</StyledButton>
    </StyledContainer>
  </>
}
  

export default WelcomeComponent;