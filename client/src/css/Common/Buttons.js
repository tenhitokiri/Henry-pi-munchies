

import styled from 'styled-components';
import { solidColor } from '../../css/Common/Theme';

export const Button = styled.button`
  background: ${props => props.primary ? "green" : "white"};
  color: ${props => props.primary ? "white" : "green"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 3px;
  transition: 0.5s all ease-out;
  cursor: pointer;
  &:hover {
    background: ${props => props.primary ? "white" : "green"};
    color: ${props => props.primary ? "green" : "white"};
  }
`;

export const CloseButton = styled(Button)`
  background: rgba(255, 255, 255, 0.3);
  color: white;
  border: 2px solid white;
  position: absolute;
  margin: 0;
  top: 0;
  right: 0;
  width: 2em;
  height: 2em;
  padding: 1px;
  justify-content: center;
  align-items: center;
  &:hover {
    color: white;
    background: red;
  }
`;