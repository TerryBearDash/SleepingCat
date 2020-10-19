import React, { Component } from 'react';
import DetailHero from '../components/detail-hero';
import Header from '../components/header';
import MoreByAuthor from '../components/more-by-author';
import EndScene from '../components/end-scene';
import Footer from '../components/footer';
import Loading from '../components/loading';

class Detail extends Component {

    state = { activeId: null, activeItem: null, moreByAuthor: null, loaded: false }

    componentDidMount() {
        window.scrollTo(0, 0);
        // console.log(this.props);
        const arr = this.props.data.simpleReducer.result;
        const id = window.location.pathname.split('/')[2];
        let active = null;
        let author = [];
        arr.forEach( (d, i) => {
            // console.log(d, i);
            if (d._id === id) {
                active = Object.assign({}, d);
            }
        });
        arr.forEach( (d, i) => {
            if (d.user) {
                if (d.user.name.first === active.user.name.first) {
                    if (author.length < 3) {
                        author.push(d);
                    }
                }
            }
        });
        this.setState({ activeId: id, activeItem: active, moreByAuthor: author });
    }
  
    getAvatar = (first, last) => {
        return fetch(`https://eu.ui-avatars.com/api/?name=${first}+${last}`)
        .then(response => response.blob())
        .then(data => {
            const u = URL.createObjectURL(data);
            return u;
        });
    }

    detailLoaded = () => this.setState({ loaded: true }) 

    render() {
        return (
            <>
                <Header />,
                <DetailHero detailLoaded={ () => this.detailLoaded() } data={this.state.activeItem} />,
                <MoreByAuthor data={this.state.moreByAuthor} />,
                <EndScene />,
                <Footer />
            {
                !this.state.loaded ? <Loading /> : null
            }
            </>
        );
    }
}

export default Detail;