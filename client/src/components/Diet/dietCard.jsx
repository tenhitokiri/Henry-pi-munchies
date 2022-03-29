import React from 'react'
import { BoxContainer } from '../../css/Body/Containers.js'
import { Link } from 'react-router-dom'
import { Button } from '../../css/Common/Buttons.js'
import { connect } from 'react-redux'
import { deleteDiet } from '../../redux'

const DietCard = ({ diet, deleteDiet }) => {
    const handleDelete = (diet) => {
        window.confirm(`Delete ${diet.name}`) && deleteDiet(diet) ? console.log('deleted') : console.log('canceled')
    }
    const handleEdit = (diet) => {
        console.log(diet)
    }
    return (
        <BoxContainer bg="color-2" width="30%" height="10vh" margin="1rem" justify="center" direction="row">
            <BoxContainer bg="color-3" width="30vw" margin="1rem" justify="center" direction="row" height="8vh">
                <Link to={`/diets/${diet.id}`}>
                    <h3>{diet.name}</h3>
                </Link>
            </BoxContainer>
            {
                diet.id !== 0 &&
                <BoxContainer bg="color-40" width="10vw" margin="0.5rem" justify="flex-end" direction="row">
                    <Button onClick={() => handleEdit(diet)}>Edit</Button>
                    <Button onClick={() => handleDelete(diet)}>Delete</Button>
                </BoxContainer>
            }

        </BoxContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteDiet: (diet) => dispatch(deleteDiet(diet)),
})
export default connect(null, mapDispatchToProps)(DietCard)