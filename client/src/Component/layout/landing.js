import React, {Fragment} from 'react';
import {Link, Redirect} from "react-router-dom";

// Redux
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const Landing = ({auth: {isAuthenticated, loading}}) => {
    if (isAuthenticated) return  <Redirect to="/dashboard" />;

    const guesLinks = (
        <div>
            <Link to="register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
            <Link to="login" className="btn btn-lg btn-light">Login</Link>
        </div>
    );

    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Developer Connector
                            </h1>
                            <p className="lead"> Create a developer profile/portfolio, share posts and get help from
                                other developers</p>
                            <hr/>
                            {!loading && (<Fragment>{!isAuthenticated ? guesLinks : ''}</Fragment>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Landing.propTypes = {
    auth: propTypes.object.isRequired
};

const mapStateToPropTypes = state => ({
    auth: state.auth
});

export default connect(mapStateToPropTypes)(Landing);