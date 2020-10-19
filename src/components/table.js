import React, { Component } from 'react';
import { Link } from "react-router-dom";
import LoadingImage from '../assets/img/cat.gif';

const showMenuStyle = {
    position: 'absolute',
    willChange: 'transform',
    top: '0px',
    left: '0px',
    transform: 'translate3d(0px, 38px, 0px)'
}

const tableHeaderStyle = {
    color: 'var(--primary)',
    fontWeight: 700,
    fontSize: '42px',
    margin: 0
}

class Table extends Component {

    state = { startPage: 1, tableData: [],  totalPages: 0, currentPage: 1, showPage: false, searchvalue: '' }

    componentDidMount() {
        // console.log(this.props.data);
        this.props.data.forEach( async (data) => {
            this.getAvatar((data.user ? data.user.name.first : 'Sleeping'), (data.user ? data.user.name.last : 'Cat')).then(d => {
                // console.log(d);
                data.image = d;
                return;
            })
        })
        this.calculatePagination(0, 'intitial');
        // console.log(this.props);
    }
  
    getAvatar = (first, last) => {
        return fetch(`https://eu.ui-avatars.com/api/?name=${first}+${last}`)
        .then(response => response.blob())
        .then(data => {
            const u = URL.createObjectURL(data);
            return u;
        });
    }

    togglePageDropdown = () => {
        // console.log('toggle dropdown');
        this.setState({ showPage: !this.state.showPage });
    }

    loadPage = async (pageNumber) => {
        // console.log(this.state);
        const arr = Object.assign([], this.props.data);
        const tableData = Object.assign([], arr.splice((pageNumber * 10) + 1, 10));
        await tableData.forEach( async (data) => {
            await this.getAvatar(data.user.name.first, data.user.name.last).then(d => {
                // console.log(d);
                data.image = d;
                return;
            })
        })
        // await console.log(tableData);
        await this.setState({ currentPage: pageNumber,  tableData: tableData });
        await setTimeout( () => {
            this.setState({ showPage: false });
        }, 500);
    }

    calculatePagination = async (start, type) => {
        // console.log(this.state);
        switch (type) {
            case 'next': {
                const arr = Object.assign([], this.props.data);
                const tableData = Object.assign([], arr.splice((this.state.currentPage * 10) + 1, 10));
                await this.setState({ currentPage: (this.state.currentPage + 1 ),  tableData: tableData });
                await setTimeout( () => {
                    this.setState({ showPage: false });
                }, 500);
                break;
            }
            case 'prev': {
                const arr = Object.assign([], this.props.data);
                const tableData = Object.assign([], arr.splice((this.state.currentPage * 10) + 1, 10));
                // await console.log(tableData);
                await this.setState({ currentPage: (this.state.currentPage - 1 ),  tableData: tableData });
                await setTimeout( () => {
                    this.setState({ showPage: false });
                }, 500);
                break;
            }
            default:
                const arr = Object.assign([], this.props.data);
                const tableData = Object.assign([], arr.splice(0, start + 10));
                const t = [];
                const totalPages = parseInt(this.props.data.length / 10);
                for (let index = 0; index < totalPages; index++) {
                    // console.log(index);
                    t.push(index);
                }
                // await console.log(tableData);
                await this.setState({ currentPage: (this.state.currentPage ),  tableData: tableData, totalPages: t});
                await setTimeout( () => {
                    this.setState({ showPage: false });
                }, 500);
                break;
        }
    }

    onSearch(ev) {
        console.log(this.props);
        const items = this.props.data.filter( (el, i) => {
            // console.log(el);
            return JSON.stringify(el).toLowerCase().includes(ev.toLowerCase()) ? el : null;
        });
        const arr = Object.assign([], items);
        const tableData = Object.assign([], arr.splice(0, 10));
        const t = [];
        const totalPages = parseInt(items.length / 10);
        for (let index = 0; index < totalPages; index++) {
            // console.log(index);
            t.push(index);
        }
        this.setState({ currentPage: (this.state.currentPage ),  tableData: tableData, totalPages: t, searchvalue: ev});
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <h3 style={tableHeaderStyle} >Search our cat facts below</h3>
                    <div className="table-options-header">
                        <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="icon ion-android-search"></i>
                            </span>
                        </div>
                        <input className="form-control" value={this.state.searchvalue} type="text" placeholder="Search" onChange={ e => this.onSearch(e.target.value) } />
                        </div>
                    </div>
                    {
                        this.state.tableData.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Type</th>
                                            <th></th>
                                            <th>first name</th>
                                            <th>last name</th>
                                            <th>cat text</th>
                                            <th>upvotes</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.tableData.map( (d, i) => {
                                                return (
                                                <tr key={i} >
                                                    <td>
                                                        <span className="profile-id">
                                                            <Link to={`/fact-detail/${d._id}`} >{d._id}</Link>
                                                        </span>
                                                    </td>
                                                    <td>{d.type}</td>
                                                    <td>
                                                        {
                                                            d.user ? (
                                                                <img src={d.image} alt={i} />
                                                            ) : ( <span className="profile-image">SC</span> )
                                                        }
                                                    </td>
                                                    <td>{
                                                        d.user ? (
                                                            d.user.name.first
                                                        ) : 'Sleeping'
                                                    }</td>
                                                    <td>{
                                                        d.user ? (
                                                            d.user.name.last
                                                        ) : 'Cat'
                                                    }</td>
                                                    <td>{d.text}</td>
                                                    <td>{d.upvotes}</td>
                                                    <td><Link to={`/fact-detail/${d._id}`} className="btn btn-primary" type="button">View</Link></td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="empty-table">
                                <img src={LoadingImage} alt="loader" />
                                <h3>No data to display</h3>
                            </div>
                        )
                    }
                    {
                        this.state.searchvalue ? (null) : (
                            <div className="table-pagination-footer">
                                <div className="btn-group" role="group">
                                    {
                                        this.state.currentPage > 1 ? (
                                            (<button className="btn btn-link" type="button" onClick={ () => { this.calculatePagination(0, 'prev') }}><i className="icon ion-chevron-left"></i></button>)
                                        ) : null
                                    }
                                <button className="btn btn-link" type="button" disabled={true}>{this.state.currentPage}</button>
                                <div className="dropdown btn-group" role="group">
                                    <button className="btn btn-outline-secondary dropdown-toggle" onClick={() => this.togglePageDropdown() } data-toggle="dropdown" aria-expanded={this.state.showPage} type="button">{this.state.totalPages.length}</button>
                                        <div className={ this.state.showPage ? ("dropdown-menu show") : "dropdown-menu" } style={ this.state.showPage ? showMenuStyle : null } x-placement="bottom-start">
                                            {
                                                this.state.totalPages ? (
                                                    this.state.totalPages.map( (v, i) => {
                                                        return <div className="dropdown-item" key={v} onClick={ () => { this.loadPage(v + 1) }}>{v + 1}</div>
                                                    })
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                    {
                                        this.state.currentPage < 26 ? (
                                            (
                                                <button className="btn btn-link" type="button" onClick={ () => { this.calculatePagination(this.state.startPage, 'next') }}><i className="icon ion-chevron-right"></i></button>)
                                        ) : null
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Table;