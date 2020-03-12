import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem("token");
        let status = true;
        if (token == null) {
            status = false;
        }
        this.state = {
            status
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                    {this.state.status ? (
                        <Link className="navbar-brand text-light" to="/home">iDeotic</Link>
                    ) : (
                            <Link className="navbar-brand text-light" to="/">iDeotic</Link>
                        )}
                    <button className="navbar-toggler" type="button" data-toggle="collapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {this.state.status ? (
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link text-light" to="/list">Breed List <span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <Link className="nav-link text-light" to="/">Breed List <span className="sr-only">(current)</span></Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    {this.state.status ? (
                        <form className="form-inline my-2 my-lg-0">
                            <Link className="btn btn-danger my-2 my-sm-0"
                                type="submit" to="/logout">Logout</Link>
                        </form>
                    ) : (
                            <form className="form-inline my-2 my-lg-0">
                                <Link className="btn btn-success my-2 my-sm-0"
                                    type="submit" to="/">Login</Link>
                            </form>
                        )}

                </nav>
            </div>
        )
    }
}

export default Navbar;