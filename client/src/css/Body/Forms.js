import styled from 'styled-components';
import { foodColor as solidColor } from '../../css/Common/Theme';

export const SearchForm = styled.form`
  position: relative;
    width: 30vh;
    height: 3vh;
    border-radius: 5%;
    background-color: ${solidColor["color-7"]};
    z-index: 2;
    input {
        width: 100%;
        height: 3vh;
        border: none;
        background-color: transparent;
        color: ${solidColor["color-6"]};
        outline: none;
        padding-left: 1vh;
        &::placeholder {
            color: ${solidColor["color-6"]};
        }   
    }
    button {
        position: absolute;
        right: 0;
        top: 0;
        width: 3vh;
        height: 3vh;
        border-radius: 0% 15% 15%  0%;
        background-color: ${solidColor["color-6"]};
        color: ${solidColor["color-7"]};
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.5s all ease-out;
        &:hover {
            background-color: ${solidColor["color-7"]};
            color: ${solidColor["color-3"]};
        }
    }
`;

export const DataForm = styled.form`
  position: relative;
    border-radius: 5%;
    flex-direction: ${props => props.direction ? props.direction : 'column'};
    align-items: ${props => props.align || 'center'}; 
    justify-content: ${props => props.justify || 'space-between'};
    width: ${props => props.width ? props.width : "100%"};
    min-height: ${props => props.height ? props.height : "auto"};
    z-index: ${props => props.zIndex ? props.zIndex : "auto"};
    background-color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
    drop-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};
    box-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};
    margin: ${props => props.margin ? props.margin : "0.5rem auto"};
    padding: ${props => props.padding ? props.padding : "0"};
    input {
        position: relative;
        width: 90%;
        height: 3vh;
        border: ${props => solidColor[props.inputBorder] ? solidColor[props.inputBorder] : "black"};
        background-color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
        &::placeholder {
            color: ${solidColor["color-6"]};
        }   
    }
    button {
        position: relative;
        padding: 0;
        width: 3vw;
        height: 3vh;
        border-radius: 5%;
        background-color: ${solidColor["color-6"]};
        color: ${solidColor["color-7"]};
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.5s all ease-out;
        &:hover {
            background-color: ${solidColor["color-7"]};
            color: ${solidColor["color-3"]};
        }
    }
    textarea {
        position: relative;
        width: 90%;
        height: 6vh;
        border: ${props => solidColor[props.inputBorder] ? solidColor[props.inputBorder] : "black"};
        background-color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
        &::placeholder {
            color: ${solidColor["color-6"]};
        }
        &:focus {
            outline: none;
            height: 10vh;
        }
    }
    span {
        position: relative;
        width: 80%;
        height: 3vh;
        border: ${props => solidColor[props.inputBorder] ? solidColor[props.inputBorder] : "black"};
        background-color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
        color: ${solidColor["color-6"]};
    }
`;

