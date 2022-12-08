import React from 'react';
import bigerpicture from '../../../assets/anh-gai-xinh-1.jpg'

function LogoCompany({ image, width='90px', height='90px' }) {
    return (
        <img 
            src={bigerpicture} 
            alt='...' 
            style={{
                width: width, 
                height: height, 
                objectFit: 'cover', 
                borderRadius: '10px'
            }}
        />
    );
}

export default LogoCompany;