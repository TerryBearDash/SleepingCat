import React from 'react';
import LoadingImage from '../assets/img/cat.gif';

const Loading = () => {
    return (
        <div className="loading">
            <img src={LoadingImage} alt="loader" />
            <p>Cat Facts Loading...</p>
        </div>
    )
}

export default Loading;