import React, {Fragment} from 'react';
import Moment from 'react-moment';
import {deleteExperience} from "../../actions/profile";

// Redux
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const Experience = ({experience, deleteExperience}) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td className="hide-sm">
                <Moment format="YYYY-MM-DD">{exp.from}</Moment> - {exp.to === null ? 'Now' : (<Moment format="YYYY-MM-DD">{exp.to}</Moment>)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-4">Experience Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>
        </Fragment>
    );
};


Experience.propTypes = {
    deleteExperience: propTypes.func.isRequired
};

export default connect(null, {deleteExperience})(Experience);