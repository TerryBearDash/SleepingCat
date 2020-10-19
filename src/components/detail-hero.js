import React, { Component } from 'react';
import Loading from '../components/loading';
import { Link } from "react-router-dom";

class DetailHero extends Component {

    state = { upvotes: 0, count: 0, images: [], activeImage: null, loaded: false }

    componentDidMount() {
        const images = []
        for (let index = 0; index < 4; index++) {
            fetch('https://aws.random.cat/meow')
            .then(response => response.json())
            .then(data => {
                images.push(data.file);
                if (index === 3) {
                    this.props.detailLoaded();
                    setTimeout( () => {
                        this.setState({ upvotes: this.props.data ? this.props.data.upvotes : 0, count: 0, images: images,activeImage: images[0], loaded: true });
                    }, 1000);
                }
            });
        }
        this.setState({ upvotes: this.props.data ? this.props.data.upvotes : 0 });
    }

    getCatImages() {
        this.getCat()
    }
  
    getCat = () => {
        fetch(`'https://aws.random.cat/meow'`)
        .then(response => response.json())
        .then(data => {
            console.log(data);  
            this.setState({ upvotes: this.props.data ? this.props.data.upvotes : 0 });
        });
    }

    upvote = () => {
        // console.log('toggle dropdown');
        this.setState({ upvotes: this.state.upvotes + 1 });
    }

    setActiveImage = (d) => {
        this.setState({ activeImage: d });
    }

    render() {
        return (
 
            this.props.data ? (
                <div className="detail-hero">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="main-image" style={{backgroundImage: `url(${this.state.activeImage})`}}></div>
                                <div className="tiled-images-container">
                                    {
                                        this.state.images.map( (d, i) => {
                                            return <div key={i} className={ this.state.activeImage === d ? 'tiled-image active' : 'tiled-image'} style={{backgroundImage: `url(${d})`}} onClick={ () => this.setActiveImage(d) }></div>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col">
                                <h1>{this.props.data.text}</h1>
                                {
                                    this.props.data.user ? (
                                        <h3>{this.props.data.user.name.first} {this.props.data.user.name.last}</h3>
                                    ) : null
                                }
                                <div className="upvotes-container">
                                    <span className="upvotes-count">{this.state.upvotes}</span>
                                    <span className="upvotes-text">upvotes</span>
                                </div>
                                <div>
                                    <button onClick={this.upvote} className="btn btn-primary" type="button">upvote</button>
                                </div>
                                <div>
    
                                    <Link to='/' className="btn btn-secondary" type="button">back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <Loading />
        );
    }
}

export default DetailHero;