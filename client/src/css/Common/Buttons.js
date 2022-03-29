

import styled from 'styled-components';
import { solidColor } from '../../css/Common/Theme';

export const DivButton = styled.div`
  position: relative;
  display: flex;
  border-radius: 10px;
  flex-direction: ${props => props.direction ? props.direction : 'column'};
  align-items: ${props => props.align || 'center'}; 
  justify-content: ${props => props.justify || 'center'};
  background: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
  color: ${props => solidColor[props.color] ? solidColor[props.color] : "white"};
  height: ${props => props.height ? props.height : "auto"};
  width: ${props => props.width ? props.width : "auto"};
  font-size: ${props => props.fontSize ? props.fontSize : "1em"};
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${props => solidColor[props.color] ? solidColor[props.color] : "white"};;
  border-radius: 3px;
  transition: 0.5s all ease-out;
  cursor: pointer;
  &:hover {
    background: ${props => solidColor[props.color] ? solidColor[props.color] : "white"};
    color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "black"};
  }
`;

export const Button = styled.button`
  background: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
  color: ${props => solidColor[props.color] ? solidColor[props.color] : "white"};
  height: ${props => props.height ? props.height : "auto"};
  width: ${props => props.width ? props.width : "auto"};

  font-size: 1rem;
  margin: 0.5rem;
  padding: 0.25rem 1rem;
  border: 2px solid ${props => solidColor[props.color] ? solidColor[props.color] : "transparent"};;
  border-radius: 3px;
  transition: 0.5s all ease-out;
  cursor: pointer;
  font-weight: 600;
  text-transform: uppercase;
  align-items: center;
  text-decoration: none;
  &:hover {
    background: ${props => solidColor[props.color] ? solidColor[props.color] : "white"};
    color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "black"};
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