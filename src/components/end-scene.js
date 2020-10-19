import React, { Component } from 'react';
import CatImage from '../assets/img/cat.gif';
import DayImage from '../assets/img/end-scene-day.png';
import NightImage from '../assets/img/end-scene-night.png';

const tableHeaderStyle = {
    color: 'var(--primary)',
    fontWeight: 700,
    fontSize: '42px',
    margin: 0
}

class EndScene extends Component {

    state = { night: false }

    componentDidMount() {
        this.checkDay();
    }

    checkDay = () => {
        setInterval( () => {
            const hours = (new Date()).getHours();
            this.setState({ night: (hours > 6 && hours < 18 ? false : true) })
        }, 1000);
    }

    render() {
        return (
            <div className="end-scene">
                <img className="img-fluid" alt="end-scene" src={ this.state.night ? NightImage : DayImage } />
                <div className="animated-cat">
                    <div className="container">
                    <img alt="cat-gif" src={CatImage} />
                    </div>
                </div>
            </div>
        );
    }
}

export default EndScene;