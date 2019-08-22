import React, {Fragment, useEffect} from 'react';
import Spinner from '../layout/spinner';

// Redux
import {getProfiles} from "../../actions/profile";
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// Component
import ProfileItem from './ProfileItem';

const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <Fragment>
            {loading ? <Spinner/> : <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and connect with developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? profiles.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    )) : <h2>No Profile Found!</h2>}
                </div>
            </Fragment>}
        </Fragment>
    );
};


Profiles.propTypes = {
    profile: propTypes.object,
    getProfiles: propTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);