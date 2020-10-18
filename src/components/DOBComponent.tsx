import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RegisterState } from '../reducer/RegisterReducer';
import { StyledContainer, StyledLabel, StyledTextBox, StyledButton } from '../styles/common';
import { errorPrompt, getValue, saveLocationToStorage, saveStateToStorage, setValue } from '../utils/utils';
import ProgressBarComponent from './ProgressBarComponent';

const DEFAULT_ERR_MSG = 'Date of Birth cannot be empty.';
const INVALID_DATE = 'Date supplied is invalid.'

const DOBComponent:React.FunctionComponent = () => {
  const history = useHistory();
  const registerState: RegisterState = useSelector(state => state as RegisterState);
  const [ error, setError ] = useState(false);
  const [ errMsg, setErrorMsg ] = useState(DEFAULT_ERR_MSG)
  const dispatch = useDispatch();
  const refBirthday = useRef(null);

  useEffect(() => {
    saveLocationToStorage('/dob');
    if (registerState.dob) setValue(refBirthday, moment(registerState.dob).format('MM/DD/YYYY'));
  });

  const onButtonClick = () => {
    const dob = getValue(refBirthday)?.trim();
    if (!dob) {
      setErrorMsg(DEFAULT_ERR_MSG);
      setError(true);
      return;
    }

    if (!Date.parse(dob)) {
      setErrorMsg(INVALID_DATE);
      setError(true);
      return;
    }

    setError(false);

    dispatch({
      type: 'ADD_DOB',
      payload: new Date(dob),
    });

    setTimeout(() => {
      saveStateToStorage(registerState);
      history.push('/agreement')
    }, 100)
  }

  return <>
  <ProgressBarComponent/>
    <StyledContainer>
      <h2>What’s your date of birth?</h2>
      <StyledContainer style={{ textAlign: 'left'}}>
        <StyledLabel>Your Birthday</StyledLabel>
        <StyledTextBox ref={refBirthday}/>
        <StyledLabel>MM/DD/YYYY</StyledLabel>
        <br/>
        {error && errorPrompt(errMsg)}
      </StyledContainer>
      <StyledButton onClick={onButtonClick}>Continue</StyledButton>
    </StyledContainer>
  </>
}

export default DOBComponent;