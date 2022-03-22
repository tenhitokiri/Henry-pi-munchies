import styled from 'styled-components';
import { solidColor } from '../../css/Common/Theme';

export const PaginationNumbers = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 3vh;
    border-radius: 10px;
    background-color: ${solidColor["color-4"]};
    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0 0.5em;
        text-decoration: none;
        color: ${solidColor["color-1"]};
        cursor: pointer;
        border-radius: 10px;
        border: 1px solid ${solidColor["color-1"]};
        &:hover {
            background-color: ${solidColor["color-3"]};
        }
    }
`;
