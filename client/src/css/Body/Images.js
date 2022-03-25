import styled from 'styled-components';
import background from '../../images/background.jpg'

export const RightBgImage = styled.div`
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-position: right 0; 
    position: fixed;
    top: 0;
    left: 50%;
    right: 0;
    height: 100vh;
    border-radius: 0px;
    opacity: 0.8;
`;
export const FullBgImage = styled.div`
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-position: right 0; 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    border-radius: 0px;
    opacity: 0.8;
`;

export const ImageBoxStyle = styled.div`
    position: relative;
    border-radius: 10px 10px 0 0;
    width: ${props => props.width ? props.width : "auto"};
    height: ${props => props.height ? props.height : "auto"};
    overflow: hidden;

    img {
        width: ${props => props.width ? props.width : "auto"};
        height: ${props => props.height ? props.height : "auto"};
        border-radius: 10px ;
    }
    img: hover {
        opacity: 0.8;
    }
    @media (max-width: 768px) {
        img {
            width: ${props => props.width ? props.width / 2 : "auto"};
            height: ${props => props.height ? props.height / 2 : "auto"};
            border-radius: 5px ;
        }

    }
`;
