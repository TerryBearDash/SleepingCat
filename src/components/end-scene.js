import React from 'react';
import CatImage from '../assets/img/cat.gif';
import EndImage from '../assets/img/end-scene-day.png';

const EndScene = () => {
    return (
        <div className="end-scene">
            <img className="img-fluid" alt="end-scene" src={EndImage} />
            <div className="animated-cat">
                <div className="container">
                <img alt="cat-gif" src={CatImage} />
                </div>
            </div>
        </div>
    )
}

export default EndScene;