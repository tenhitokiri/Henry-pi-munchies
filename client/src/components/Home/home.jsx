import React from 'react'
import { MainContainer, BoxContainer, HeaderContainer } from '../../css/Body/Containers.js'
import { DivButton } from '../../css/Common/Buttons.js';
import { Link } from 'react-router-dom';

import ImageCard from '../Common/image.jsx'
import alexander_mils_6 from '../../images/alexander_mils_6.jpg'
import alexander_schimmeck_6 from '../../images/alexander_schimmeck_6.jpg'
import heather_ford_1 from '../../images/heather_ford_1.jpg'

const Home = () => {
    const LeftContainer = BoxContainer;
    const RightContainer = BoxContainer;
    const ImagesContainer = BoxContainer;
    const HeroContainer = BoxContainer;

    return (
        <MainContainer direction="row" bg="transparent" justify="center" height="100%">
            <LeftContainer bg="color-20" width="60%" height="100%" padding="0">
                <HeaderContainer height="30%" fontColor="color-7" justify="center">
                </HeaderContainer>
                <ImagesContainer direction="row" height="35%" zIndex="9" justify="center" align="flex-start">
                    <ImageCard src={heather_ford_1} alt="heather_ford_1" height='412' width='300' />
                    <ImageCard src={alexander_schimmeck_6} alt="alexander_schimmeck_6" height='412' width='350' />
                    <ImageCard src={alexander_mils_6} alt="alexander_mils_6" height='412' width='300' />
                </ImagesContainer>
                <HeroContainer width="90%" height="30%" bg="color-1" align="center" justify="center">
                    <DivButton primary="true" height="50px" width="250px" bg="color-3" color="color-6" fontSize="2rem">
                        <Link to="/recipes">
                            Lets GO!!
                        </Link>
                    </DivButton>
                </HeroContainer>
            </LeftContainer>
            <RightContainer width="40%" justify="center">
                <HeaderContainer height="30%" fontColor="color-7" justify="center">
                    <h1>Cooking 4 All!</h1>
                    <h2>Welcome...</h2>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium hic, nobis assumenda laborum est, molestias laudantium, incidunt dolorem quidem blanditiis necessitatibus ducimus? Neque eaque cum accusamus voluptatibus exercitationem sapiente aspernatur.
                    </p>
                </HeaderContainer>

            </RightContainer>
        </MainContainer>
    )
}

export default Home