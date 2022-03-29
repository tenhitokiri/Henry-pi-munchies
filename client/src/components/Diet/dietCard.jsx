import React, { useState } from 'react'
import { BoxContainer } from '../../css/Body/Containers.js'
import { Button } from '../../css/Common/Buttons.js'
import { connect } from 'react-redux'
import { updateDiet } from '../../redux/'


const DietCard = ({ diet, handleDelete, updateDiet }) => {
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState(diet.name);

    const validationErrors = {
        name: name && name.length > 3 ? '' : 'Name is required. Must be at least 4 characters.',
    }

    const handleEdit = (diet) => {
        setEdit(true)
    }
    const handleSave = (diet) => {
        if (validationErrors.name.length === 0 && window.confirm(`update ${diet.name}?`)) {
            const updatedDiet = { ...diet, name }
            console.log(updatedDiet)
            updateDiet(updatedDiet)
            setEdit(false)
        }
    }
    const handleNameChange = (e) => {
        const name = e.target.value
        setName(name)
    }
    return (
        <BoxContainer bg="color-2" width="30%" height="10vh" margin="1rem" justify="center" direction="row">
            <BoxContainer width="30vw" margin="1rem" justify="center" height="8vh">
                {edit ? <><input type="text" value={name} onChange={handleNameChange} />{validationErrors.name}</> : <h3>{diet.name}</h3>}
            </BoxContainer>
            {
                diet.id !== 0 &&
                <BoxContainer bg="color-1" width="11vw" margin="0.5rem" justify="flex-end" direction="row">
                    {
                        edit ? <Button onClick={() => handleSave(diet)}>Save</Button> : <>
                            <Button onClick={() => handleEdit(diet)}>Edit</Button>
                            <Button onClick={() => handleDelete(diet)}>Delete</Button>
                        </>
                    }
                </BoxContainer>
            }
        </BoxContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    //deleteDiet: (diet) => dispatch(deleteDiet(diet)),
    //fetchDiets: () => dispatch(fetchDiets())
    updateDiet: (diet) => dispatch(updateDiet(diet)),
})
export default connect(null, mapDispatchToProps)(DietCard)