import React, {Fragment, useEffect} from 'react';
import Spinner from '../layout/spinner';
import {Link} from "react-router-dom";

// Redux
import {getProfileById} from "../../actions/profile";
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// Component
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({getProfileById, profile: {profile, loading}, auth, getId}) => {
    const id = localStorage.getItem('profile_id');

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById]);

    return <Fragment>
        {profile === null || loading ? <Spinner/> : <Fragment>
            <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && <Fragment>
                <Link to="/edit-profile" className="btn btn-primary">Edit Profile</Link>
            </Fragment>}
            <div className="profile-grid my-1">
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
                <ProfileExperience profile={profile}/>
                <ProfileEducation profile={profile}/>
                {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
            </div>
        </Fragment>}
    </Fragment>
};


Profile.propTypes = {
    profile: propTypes.object.isRequired,
    getProfileById: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileById})(Profile);