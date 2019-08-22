import React, {Fragment, useEffect} from 'react';
import {Link} from "react-router-dom";
import Spinner from '../layout/spinner';
import DashboardAction from './DashboardActions';

// Redux
import {getCurrentUserProfile} from "../../actions/profile";
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// Component
import Experience from './Experience';
import Education from './Education';

// Actions
import {deleteAccount} from "../../actions/profile";

const Dashboard = ({profile: {profile}, auth: {user}, getCurrentUserProfile, deleteAccount}) => {
    useEffect(() => {
        getCurrentUserProfile();
    }, [getCurrentUserProfile]);

    return profile.loading && profile.profile === null ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile.profile !== null ? <Fragment>
            <DashboardAction/>
            <Experience experience={profile.profile.experiences}/>
            <Education education={profile.profile.education}/>
            <div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user mr-1"></i>
                    Delete My Account
                </button>
            </div>
        </Fragment> : (
            <Fragment>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
            </Fragment>
        )}
    </Fragment>;
};


Dashboard.propTypes = {
    auth: propTypes.object,
    profile: propTypes.object,
    getCurrentUserProfile: propTypes.func.isRequired,
    deleteAccount: propTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state
});

export default connect(mapStateToProps, {getCurrentUserProfile, deleteAccount})(Dashboard);