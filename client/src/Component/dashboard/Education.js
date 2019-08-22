import React, {Fragment} from 'react';
import Moment from 'react-moment';
import {deleteEducation} from "../../actions/profile";

// Redux
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const Education = ({education, deleteEducation}) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td className="hide-sm">
                <Moment format="YYYY-MM-DD">{edu.from}</Moment> - {edu.to === null ? 'Now' : (<Moment format="YYYY-MM-DD">{edu.to}</Moment>)}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-4">Education Credentials</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>School</th>
                    <th className="hide-sm">Degree</th>
                    <th className="hide-sm">Years</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    deleteEducation: propTypes.func.isRequired
};

export default connect(null, {deleteEducation})(Education);