import React from 'react';

const tileStyle = {
    backgroundImage: 'url(https://placekitten.com/500/400)',
    width: '100%'
}

const MoreByAuthor = (props) => {
    return (
        <div className="latest-row">
            <div className="container">
                {
                    props.data ? (
                        props.data[0].user ? (
                        (<h1>More from {props.data[0].user.name.first} {props.data[0].user.name.last}</h1>)
                        ) : (<h1>More from Sleeping Cat</h1>)
                    ) : null
                }
                <div className="row">
                    {
                        props.data ? (
                            props.data.map( (d, i) => {
                                return <div className="col-4" key={i}>
                                    <div className="sum-card" style={tileStyle}>
                                        <div className="overlay-summary">
                                            <h1>{d.text}</h1>
                                                {
                                                    d.user ? (
                                                    (<h3>{d.user.name.first} {d.user.name.last}</h3>)
                                                    ) : (<h3>Sleeping Cat</h3>)
                                                }
                                            <div className="upvotes-container"><span className="upvotes-count">6</span><span className="upvotes-text">upvotes</span></div>
                                        </div>
                                    </div>
                                </div>
                            })
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default MoreByAuthor;