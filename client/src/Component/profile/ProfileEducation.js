import React, {Fragment} from 'react';
import Moment from "react-moment";

const ProfileEducation = ({profile: {education}}) => {
    const edu = education.map(edu => (
        <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
                <Moment format="MMMM YYYY">
                    {edu.from}
                </Moment> - {}
                {edu.current ? 'Now' : <Moment format="MMMM YYYY">{edu.to}</Moment>}
            </p>
            <p><strong>Degree: </strong>{edu.degree}</p>
            <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
            {edu.description && <Fragment>
                <p>
                    <strong>Description: </strong>
                    {edu.description}
                </p>
            </Fragment>}
        </div>
    ));

    return (
        <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {education.length > 0 ? <Fragment>
                {edu}
            </Fragment> : <b>No Education Found!</b>}
        </div>
    );
};


export default ProfileEducation;