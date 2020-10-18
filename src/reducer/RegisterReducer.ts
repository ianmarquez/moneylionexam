export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Agreement {
  agreement1: boolean;
  agreement2: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export type RegisterState = PersonalData & Agreement & { dob: Date };

const initialState: RegisterState = {
  firstName: '',
  lastName: '',
  email: '',
  agreement1: false,
  agreement2: false,
  dob: new Date(),
}

const getInitialState = (): RegisterState => {
  const savedState = window.localStorage.getItem('RegisterState');
  if (savedState) {
    return JSON.parse(savedState);
  } else {
    return initialState;
  }
}

const RegisterReducer = (state: RegisterState = getInitialState(), action: Action) => {
  const { type, payload } = action;
  let currentState = {...state}
  switch (type) {
    case 'ADD_PERSONAL_DATA':
      const { firstName, lastName, email } = payload as PersonalData;
      currentState.firstName = firstName;
      currentState.lastName = lastName;
      currentState.email = email;
      break;
    case 'ADD_DOB':
      const dob = payload;
      currentState.dob = dob;
      break;
    case 'ADD_AGREEMENT':
      const { agreement1, agreement2 } = payload as Agreement;
      currentState.agreement1 = agreement1;
      currentState.agreement2 = agreement2;
      break;
    case 'RESET':
      currentState = initialState;
      window.localStorage.removeItem('RegisterState');
      window.localStorage.removeItem('lastPage');
      break;
  }
  return currentState;
}

export default RegisterReducer;