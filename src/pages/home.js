import React from 'react';
import HeroImg from '../assets/img/hero-logo.png';
import SearchImage from '../assets/img/search-image-top.png';
import Card from '../components/card';
import Table from '../components/table';
import EndScene from '../components/end-scene';
import Footer from '../components/footer';
import { Link } from "react-router-dom";

const Home = (props) => {
    console.log(props);

    const updatePages = (evt) => {
        console.log(evt);
        props.data.simpleAction();
    }

    return ([
        <div className="hero" key="1">
            <div className="container">
                <div className="row">
                    <div className="col-5 pl-5 pr-5 align-self-center">
                        <img alt="hero-logo" className="img-fluid" src={HeroImg} />
                    </div>
                    <div className="col-7 align-self-center">
                        <div>
                            <h1>Cat Facts Made Easy</h1>
                            <p>
                                { 
                                    props.data.simpleReducer.result[Math.floor(Math.random() * props.data.simpleReducer.result.length)].text
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        <div className="latest-row" key="2">
            <div className="container">
                <h1>Latest Facts</h1>
                <div className="row">
                    {
                        props.data.simpleReducer.result.map( (d, i) => {
                            return i < 3 ? (
                                <div className="col-4" key={i}>
                                    <Link to={`/fact-detail/${d._id}`}>
                                        <Card data={d} key={i} /> 
                                    </Link>
                                </div>
                                ): null
                        })
                    }
                </div>
                <div className="row-spacer">
                    <img className="search-image-top" src={SearchImage} alt="search-top" />
                </div>
            </div>
        </div>,
        <div className="container">
            <Table props={props} onPageChange={updatePages} data={props.data.simpleReducer.result} key="3" />
        </div>,
        <EndScene />,
        <Footer />
    ])
}

export default Home;