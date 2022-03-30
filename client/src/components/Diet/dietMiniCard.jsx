import React, { useState } from 'react'
import { BoxContainer } from '../../css/Body/Containers.js'
import { connect } from 'react-redux'
import { updateDiet } from '../../redux'
//import { CheckedButton } from '../../css/Common/Buttons.js'


const DietMiniCard = ({ diet, handleSelect }) => {
    let { checked } = diet;

    return (
        <BoxContainer bg={diet.checked ? "color-1" : "color-2"} width="22%" height="2vh" margin="0.5rem" justify="center" direction="row">
            <BoxContainer width="20vw" margin="1rem" justify="center" height="1vh">
                {diet.name}
            </BoxContainer >
            <BoxContainer width="10vw" margin="1rem" justify="center" height="1em" bg="color-3">
                <label class="switch">
                    {checked ? <input type="checkbox" onChange={() => handleSelect(diet.id)} checked /> : <input type="checkbox" onChange={() => handleSelect(diet.id)} />}
                    <span class="slider round"></span>
                </label>
                {/* 
                <CheckedButton onClick={() => handleCheck(diet)} value={checked}>x</CheckedButton>
                 */}
            </BoxContainer>
        </BoxContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    //deleteDiet: (diet) => dispatch(deleteDiet(diet)),
    //fetchDiets: () => dispatch(fetchDiets())
    updateDiet: (diet) => dispatch(updateDiet(diet)),
})
export default connect(null, mapDispatchToProps)(DietMiniCard)