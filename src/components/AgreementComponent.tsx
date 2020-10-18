import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { StyledContainer, StyledLabel, StyledButton, StyledLink } from '../styles/common';
import ProgressBarComponent from './ProgressBarComponent';
import { Checkbox, Grid, Snackbar  } from '@material-ui/core';
import { RegisterState } from '../reducer/RegisterReducer';
import { useDispatch, useSelector } from 'react-redux';
import { errorPrompt, saveLocationToStorage } from '../utils/utils';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const DEFAULT_ERROR_MESSAGE = 'You must agree to the conditions above to proceed.';
const API_REQUEST_FAILED = 'An error has occurred reaching the server. Please try again later.';
const REQUIRED_FIELDS = 'First Name, Last Name, Email and DOB is required.'

const AgreementComponent = () => {
  const registerState: RegisterState = useSelector(state => state as RegisterState);
  const dispatch = useDispatch();
  const [ agreement1, setAgreement1 ] = useState(registerState.agreement1);
  const [ agreement2, setAgreement2 ] = useState(registerState.agreement2);
  const [ error, setError ] = useState(false);
  const [ saveSuccess, setSaveSuccess] = useState(false);
  const [ errMsg, setErrorMessage ] = useState(DEFAULT_ERROR_MESSAGE);
  const history = useHistory();

  useEffect(() => {
    saveLocationToStorage('/agreement');
  });

  const onButtonClick = async () => {
    if (!agreement1 || !agreement2 ) return setError(true);
    dispatch({
      type: 'ADD_AGREEMENT',
      payload: {
        agreement1,
        agreement2
      }
    });

    const { firstName, lastName, email, dob } = registerState;
    
    if (!firstName || !lastName || !email || ! dob) {
      setError(true);
      setErrorMessage(REQUIRED_FIELDS);
      return;
    }

    try {
      await axios.post('https://5f79819fe402340016f93139.mockapi.io/api/user', registerState);
      setError(false);
      setSaveSuccess(true);
      window.localStorage.removeItem('RegisterState');
      window.localStorage.removeItem('lastPage');
    } catch (err) {
      setErrorMessage(API_REQUEST_FAILED);
      setError(true);
      return;
    }
    setTimeout(() => history.push('/welcome'), 1000)
  }

  const renderSuccessMessage = () => <Snackbar open={true} autoHideDuration={6000}>
    <Alert severity="success">
      You have been registered!
    </Alert>
  </Snackbar>


  return <>
    <ProgressBarComponent/>
    <StyledContainer>
      <h2>One last step!</h2>
      <StyledContainer style={{ textAlign: 'left'}}>
        <Grid container>
          <Grid item sm={12}>
            <StyledLabel>Agreement</StyledLabel> <br/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item sm={2}>
            <Checkbox checked={agreement1} onChange={() => setAgreement1(!agreement1)}></Checkbox>
          </Grid>
          <Grid item sm={10}>
            <Grid item sm={12}><StyledLabel>I agree to the</StyledLabel></Grid>
            <Grid item sm={12}><StyledLink>Electronic Transaction Esign Consent</StyledLink></Grid>
          </Grid>
        </Grid>
        <br/>
        <Grid container>
          <Grid item sm={2}>
              <Checkbox 
                checked={agreement2} 
                onChange={() => setAgreement2(!agreement2)}
              />
            </Grid>
            <Grid item sm={10}>
              <Grid item sm={12}><StyledLabel>I agree to the folowing agreements:</StyledLabel></Grid>
              <Grid item sm={12}><StyledLink>Privacy Notice</StyledLink></Grid>
              <Grid item sm={12}><StyledLink>Terms and Conditions</StyledLink></Grid>
              <Grid item sm={12}><StyledLink>Membership Agreement</StyledLink></Grid>
            </Grid>
        </Grid>
        <br/>
        {error && errorPrompt(errMsg)}
        {saveSuccess && renderSuccessMessage()}
      </StyledContainer>
      <StyledButton onClick={onButtonClick}>Agree &amp; Create Account</StyledButton>
    </StyledContainer>
  </>
}

export default AgreementComponent;