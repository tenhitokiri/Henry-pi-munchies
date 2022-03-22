import React from 'react'
import { MainContainer, BoxContainer, HeaderContainer } from '../../css/Body/Containers.js'
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
        <MainContainer direction="row" bg="transparent" justify="center">
            <LeftContainer direction="column" bg="color-20" width="60%" height="100%" padding="0">
                <HeaderContainer direction="column" width="100%" height="30%" fontColor="color-6" justify="center">
                    <h1>Cooking 4 All!</h1>
                    <h2>Welcome...</h2>
                </HeaderContainer>
                <ImagesContainer direction="row" width="100%" height="35%" zIndex="9" justify="center" align="flex-start">
                    <ImageCard src={heather_ford_1} alt="heather_ford_1" height='412' width='300' />
                    <ImageCard src={alexander_schimmeck_6} alt="alexander_schimmeck_6" height='412' width='350' />
                    <ImageCard src={alexander_mils_6} alt="alexander_mils_6" height='412' width='300' />
                </ImagesContainer>
                <HeroContainer direction="column" width="100%" height="35%" bg="color-1" align="center" justify="center">
                    <h1>Lets GO!!</h1>
                </HeroContainer>
            </LeftContainer>
            <RightContainer direction="column" width="40%" >
            </RightContainer>
        </MainContainer>
    )
}

export default Home