import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

// Redux
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-user mr-1"></i>
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/profiles">Developers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/posts">Posts</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#" onClick={logout}>
                    <i className="fas fa-sign-out-alt mr-1"></i>
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/profiles">Developers</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container mt-0 mb-0">
                <Link className="navbar-brand" to="/">DevConnector</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mobile-nav">
                    { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
                </div>
            </div>
        </nav>
    )
};

Navbar.propTypes = {
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
};

const mapStateToPropTypes = state => ({
    auth: state.auth
});

export default connect(mapStateToPropTypes, {logout})(Navbar);