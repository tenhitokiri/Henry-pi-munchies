import React from 'react'
import { DogCardStyle, CardHeaderStyle, CardBodyStyle } from '../../css/Body/Dog.js'
import { Link } from 'react-router-dom'

const DogCard = ({ dog }) => {
    const temperaments = dog.temperament ? dog.temperament.map((temperament, index) => <li>{temperament}</li>) : null
    return (
        <DogCardStyle>
            <CardHeaderStyle>
                <img src={dog.image_url} alt={dog.name} />
            </CardHeaderStyle>
            <CardBodyStyle >
                <h2 >
                    <Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
                </h2>
                <h3>Weight: {dog.weight} Pounds</h3>
                <h3>Temperaments:
                </h3>
                <ul>
                    {temperaments}
                </ul>
            </CardBodyStyle>
        </DogCardStyle>
    )
}

export default DogCard