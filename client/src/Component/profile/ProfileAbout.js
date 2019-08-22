import React, {Fragment} from 'react';

const ProfileAbout = ({profile: {bio, skills, user: {name}}}) => {
    const loadSkill = skills.map((skill, index) => (
        <div className="p-1" key={index}>
            <i className="fa fa-check"></i>
            {skill}
        </div>
    ));

    return (
        <div className="profile-about bg-light p-2">
            {bio && <Fragment>
                <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
                <p>{bio}</p>
                <div className="line"></div>
            </Fragment>}
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {loadSkill}
            </div>
        </div>
    );
};


export default ProfileAbout;