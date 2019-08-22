import React, {Fragment} from 'react';
import Moment from "react-moment";

const ProfileExperience = ({profile: {experiences}}) => {
    const exps = experiences.map((exp, index) => (
        <div key={index}>
            <h3 className="text-dark">{exp.company}</h3>
            <p>
                <Moment format="YYYY-MM-DD">
                    {exp.from}
                </Moment> - {}
                {exp.current ? 'Now' : <Moment format="YYYY-MM-DD">{exp.to}</Moment>}
            </p>
            <p><strong>Position: </strong>{exp.title}</p>
            {exp.description && <Fragment>
                <p>
                    <strong>Description: </strong>
                    {exp.description}
                </p>
            </Fragment>}
        </div>
    ));


    return (
        <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {experiences.length > 0 ? <Fragment>
                {exps}
            </Fragment> : <b>No Experience found!</b>}
        </div>
    );
};


export default ProfileExperience;