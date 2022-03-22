import styled from 'styled-components';
import { solidColor } from '../../css/Common/Theme';

export const NavContainer = styled.header`
    background: ${solidColor["color-6"]};
    color: ${solidColor["color-7"]};
    padding: 1em;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    height: 30px;
    align-items: center;
    position: sticky;
    width: 98%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    box-shadow: 0 0 5px ${solidColor["color-7"]};
`;

export const LeftContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0 1em;
text-decoration: none;
a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    text-decoration: none;
    img {
        width: 50px;
        height: auto;
    }
    h1 {
        font-size: 1.5em;
        margin: 0.3em;
    }
} 
`
export const RightContainer = styled.nav`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
padding: 0 1em;
text-decoration: none;
display: flex;
ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    text-decoration: none;
    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 1em;
        text-decoration: none;
        text-transform: uppercase;
            a{
                font-weight: 600;
                text-transform: uppercase;
                align-items: center;
                padding-right: 10px;
                text-decoration: none;
                color: ${solidColor["color-7"]};
            }
        }
    }
`
export const BurgerNav = styled.div`
position: fixed;
width: 150px;
background: ${solidColor["color-4"]};
top: 0;
right: 0;
bottom: 0;
padding: 5px;
list-style: none;
align-items: center;
cursor: pointer;
transform: ${props => props.show ? `translateX(0%)` : `translateX(100%)`}; 
transition: transform 0.3s ease-in-out;
z-index: 10;
box-shadow: 0 0 5px ${solidColor["color-1"]};
ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0.5 em;
    text-decoration: none;
    li {
        padding: 2px;
        border-bottom: 1px solid ${solidColor["color-1"]};
        margin: 0.5em;
        a{
            font-weight: 300;
            text-transform: uppercase;
            align-items: center;
            padding-right: 5px;
            margin-left: 5px;
            text-decoration: none;
            color: ${solidColor["color-1"]};
        }
    }
}
div {
    display: flex;
    justify-content: flex-end;
    align-items: right;
    h2 {
        font-weight: 200;
        text-transform: uppercase;
        align-items: right;
        padding-right: 10px;
        text-decoration: none;
        color: ${solidColor["color-1"]};
    }
}
@media (max-width: 768px) {
    padding-right: 40px;
}
`
