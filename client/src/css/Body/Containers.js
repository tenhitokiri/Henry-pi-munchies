import styled from 'styled-components';
import { solidColor, foodColor70 } from '../Common/Theme';

export const RecipeCardStyle = styled.div`
    margin: 1em 1.5em;
    display: flex;
    flex-direction: row;
    width: 550px;
    height: 500px;
    display: flex;
    flex-direction: column;
    background-color: ${solidColor["color-5"]};
    drop-shadow: 0px 0px 10px ${solidColor["color-1"]};
    border-radius: 10px;
    box-shadow: 0px 0px 10px ${solidColor["color-1"]};
    @media (max-width: 768px) {
        width: 100%;
    }
`;
export const CardHeaderStyle = styled.div`
    position: relative;
    width: 100%;
    background-color: ${solidColor["color-4"]};
    border-radius: 10px 10px 0 0;
    background-color: ${solidColor["color-5"]};
    background-image: ${props => `url('${props.bgImage}')`};
    background-size: 450px 300px;
    background-repeat: no-repeat;
    background-position: top;
    img {
        width: 100%;
        height: 270px;
        border-radius: 10px 10px 0 0;
    }
`;

export const CardBodyStyle = styled.div`
    h2 {
        position: relative;
        top: -25px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${solidColor["color-5"]};
        font-size: 1.5em;
        font-weight: bold;
        text-shadow: 0px 0px 10px ${solidColor["color-1"]};
        background-color: ${foodColor70["color-4"]};
    }
    h3 {
        position: relative;
        padding: 0.5em;
        top: -25px;
        display: flex;
        align-items: center;    
        margin-bottom: 10px;
        color: ${solidColor["color-2"]};
        font-size: 1em;
        font-weight: bold;
        text-shadow: 0px 0px 10px ${solidColor["color-1"]};
    }
    a {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${solidColor["color-2"]};
        font-size: 1em;
        font-weight: bold;
        text-shadow: 0px 0px 10px ${solidColor["color-1"]};
    }
    div {
        position: relative;
        padding: 1em;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: ${solidColor["color-4"]};
        border-radius: 0 0 10px 10px;
    }
    ul {
        top: -50px;
        position: relative;
        display: flex;
        flex-flow: row wrap;
        font-size: 0.2 rem;
        li {
            text-decoration: none;
            margin: 0.2em;
            padding: 0.3em;
            border-radius: 10px;
            background-color: ${foodColor70["color-1"]};
        }
    }
`;
export const CardFooterStyle = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    bottom: 0;

    h2 {
        position: relative;
        top: -25px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${solidColor["color-5"]};
        font-size: 1.5em;
        font-weight: bold;
        text-shadow: 0px 0px 10px ${solidColor["color-1"]};
        background-color: ${foodColor70["color-4"]};
    }
`;

export const RecipeListStyle = styled.div`
    width: 100%;
    height: 95%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: row wrap;
    overflow: auto;
    background-color: ${solidColor["color-5"]};
    drop-shadow: 0px 0px 10px ${solidColor["color-1"]};
    border-radius: 10px;
    box-shadow: 0px 0px 10px ${solidColor["color-1"]};
    @media (max-width: 768px) {
        width: 100%;
    }
        `;


export const MainContainer = styled.div`
position: relative;
margin: 1em auto;
display: flex;
flex-direction: ${props => props.direction || 'column'};
justify-content: top;
width: 99%;
min-height: 90vh;
background-color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
drop-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};
border-radius: 10px;
box-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};
@media (max-width: 768px) {
    width: 100%;
}
`;

export const BoxContainer = styled.div`
position: relative;
display: flex;
border-radius: 10px;
flex-direction: ${props => props.direction ? props.direction : 'column'};
align-items: ${props => props.align || 'center'}; ;
justify-content: ${props => props.justify || 'space-between'};
width: ${props => props.width ? props.width : "auto"};
min-height: ${props => props.height ? props.height : "auto"};
z-index: ${props => props.zIndex ? props.zIndex : "auto"};
background-color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
drop-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};
box-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};
margin: ${props => props.margin ? props.margin : "0"};
padding: ${props => props.padding ? props.padding : "0"};
@media (max-width: 768px) {
    width: 100%;
}
`;

export const HeaderContainer = styled.div`
position: sticky;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;    
border-radius: 10px;

flex-direction: ${props => props.direction || 'column'};
align-items: ${props => props.align || 'center'}; ;
justify-content: ${props => props.justify || 'space-between'};
min-height: ${props => props.height ? props.height : "auto"};
background-color: ${props => solidColor[props.bg] ? solidColor[props.bg] : "transparent"};
drop-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};
box-shadow: ${props => solidColor[props.shadow] ? `0px 0px 10px ${solidColor[props.shadow]}` : '0px'};

div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    text-decoration: none;
}
h1 {
    font-size: 4.5em;
    font-weight: bold;
    color: ${props => solidColor[props.fontColor] ? solidColor[props.fontColor] : "white"};
    text-decoration: none;
}
h2 {
    font-size: 1.5em;
    font-weight: bold;
    color: ${props => solidColor[props.fontColor] ? solidColor[props.fontColor] : "white"};
    text-decoration: none;
}
`;

export const FooterContainer = styled.div`
position: sticky;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid ${solidColor["color-1"]};
width: 100%;    
height: 5vh;
border-radius: 10px;
background-color: ${solidColor["color-4"]};
div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    text-decoration: none;
}
`;

export const AppContainer = styled.div`
    background-color: ${solidColor["color-3"]};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
