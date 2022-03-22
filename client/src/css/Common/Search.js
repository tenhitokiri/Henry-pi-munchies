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
