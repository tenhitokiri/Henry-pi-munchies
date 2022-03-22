import React from 'react'
import { ImageBoxStyle } from '../../css/Body/Images.js'

const ImageCard = ({ src, alt, height, width }) => {
    return (
        <ImageBoxStyle height={height} width={width}>
            {height && width ? <img src={src} alt={alt} height={height} width={width} /> : <img src={src} alt={alt} />}
        </ImageBoxStyle>
    )
}

export default ImageCard;