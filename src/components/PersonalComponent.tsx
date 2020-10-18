import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { StyledButton, StyledContainer, StyledLabel, StyledTextBox } from '../styles/common';
import ProgressBarComponent from './ProgressBarComponent';
import { useDispatch, useSelector } from 'react-redux'
import { errorPrompt, getValue, saveLocationToStorage, saveStateToStorage, setValue } from '../utils/utils';
import { RegisterState } from '../reducer/RegisterReducer';

const PersonalComponent : React.FunctionComponent = () => {
  const [ error, setError ] = useState(false);
  const dispatch = useDispatch();
  const registerState: RegisterState = useSelector(state => state as RegisterState);
  const refFN = useRef(null);
  const refLN = useRef(null);
  const refEmail = useRef(null);
  const history = useHistory();

  useEffect(() => {
    saveLocationToStorage('/personal');
    if (registerState.firstName) setValue(refFN, registerState.firstName);
    if (registerState.lastName) setValue(refLN, registerState.lastName);
    if (registerState.email) setValue(refEmail, registerState.email);
  });

  const onButtonClick = () => {
    const firstName = getValue(refFN)?.trim();
    const lastName = getValue(refLN)?.trim();
    const email = getValue(refEmail)?.trim();
    if (!firstName || !lastName || !email) return setError(true);
    setError(false);
    dispatch({
      type: 'ADD_PERSONAL_DATA',
      payload: {
        firstName,
        lastName,
        email
      }
    });
    setTimeout(() => {
      saveStateToStorage({...registerState,...{ firstName, lastName, email }});
      history.push('/dob')
    }, 100)
  }


  return <>
    <ProgressBarComponent/>
    <StyledContainer>
      <h2>Create your Account</h2>
      <StyledContainer style={{ textAlign: 'left'}}>
        <StyledLabel>First Name</StyledLabel>
        <StyledTextBox ref={refFN}/>
        <StyledLabel>Last Name</StyledLabel>
        <StyledTextBox ref={refLN}/>
        <StyledLabel>Email</StyledLabel>
        <StyledTextBox ref={refEmail}/>
        {error && errorPrompt("First Name, Last Name and Email cannot be empty.")}
      </StyledContainer>
      <StyledButton onClick={onButtonClick}>Continue</StyledButton>
    </StyledContainer>
  </>
}

export default PersonalComponent;