import { Alert } from '@material-ui/lab';
import React from 'react';
import { RegisterState } from '../reducer/RegisterReducer';

export const getValue = (ref:React.MutableRefObject<null>):string | null => {
  return ref && ref.current && (ref.current as any).value ? (ref.current as any).value : null;
}

export const setValue = (ref: React.MutableRefObject<null>, value: string): void => {
  if (ref && ref.current && !(ref.current as any).value) {
    (ref.current as any).value = value;
  }
}

export const errorPrompt = (message: string) => <Alert variant="filled" severity="error">{message}</Alert>;

export const saveStateToStorage = (state: RegisterState) => {
  window.localStorage.setItem('RegisterState', JSON.stringify(state));
}

export const saveLocationToStorage = (url: string) => {
  window.localStorage.setItem('lastPage', url);
}