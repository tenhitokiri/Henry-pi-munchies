import React from 'react'
import DogCard from './DogCard.jsx'
import { DogListStyle } from '../../css/Body/Dog.js'

const DogsPaging = ({ dogList, pageSize, total, orderBy }) => {
    const listMarkup = dogList.length > 0 ? (dogList.map(dog => <DogCard key={dog.id} dog={dog} />)) : (<p>No dogs found</p>)
    return (
        <DogListStyle>
            {listMarkup}
        </DogListStyle>
    )
}
export default DogsPaging