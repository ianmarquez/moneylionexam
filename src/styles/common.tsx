import styled from 'styled-components';

export const MainPage = styled.div`
  text-align: center;
  color: black;
`;

export const StyledContainer = styled.div`
  text-align: ${props => props.style?.textAlign ? props.style?.textAlign : "center"};
  max-width: 701px;
  color: black;
  margin: 30px auto;
  padding: 10px;
`;

export const StyledButton = styled.button`
  width: 328px;
  height: 50px;
  border-radius: 6px;
  color:white;
  text-transform: uppercase;
  background: #2ECFBF;
  border: 0px;
`;

export const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  line-height: 14px;
  color: #6F8086;
  display:block;
`;

export const StyledTextBox = styled.input`
  outline: 0;
  border-width: 0 0 2px;
  border-color: #B1B1B1;
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
  font-size: 20px;
  
  &:focus {
    border-color: #2ECFBF;
  }
`;

export const StyledLink = styled.a`
  display: inline-block;
  height: 14px;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #2ECFBF;
  text-decoration: none;
  cursor: pointer;
`;