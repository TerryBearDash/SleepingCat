import React from 'react';

const tileStyle = {
    backgroundImage: 'url(https://placekitten.com/500/400)'
}

const Card = (props) => {
    return (
        <div className="sum-card" style={tileStyle}>
            <div className="overlay-summary">
                <h1>{props.data.text}</h1>
                <h3>{props.data.user.name.first} {props.data.user.name.last}</h3>
                <div className="upvotes-container">
                    <span className="upvotes-count">{props.data.upvotes}</span>
                    <span className="upvotes-text">upvotes</span>
                </div>
            </div>
        </div>
    )
}

export default Card;