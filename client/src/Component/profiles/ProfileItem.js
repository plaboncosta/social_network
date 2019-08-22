import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import propTypes from "prop-types";
import {getProfileById} from "../../actions/profile";

const ProfileItem = ({profile: {user, company, location, status, _id, skills}, getProfileById, history}) => {
    return <Fragment>
        <div className="profile bg-light">
            <img className="round-img" src={user.avatar} alt=""/>
            <div>
                <h2>{user.name}</h2>
                <p>{status} at {company && <span>{company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <button onClick={() => {
                    history.push(`/profile`);
                    getProfileById(_id)
                } } className="btn btn-primary">View Profile</button>
            </div>
            <ul>
                {skills && skills.map((skill, index) => (
                    <li className="text-primary" key={index}>
                        <i className="fas fa-check"></i> { skill }
                    </li>
                ))}
            </ul>
        </div>
    </Fragment>;
};

ProfileItem.propTypes = {
    getProfileById: propTypes.func.isRequired
};

export default connect(null, {getProfileById})(withRouter(ProfileItem));