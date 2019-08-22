import React from 'react';

const ProfileTop = ({profile: {user: {name, avatar}, status, company, location, website, social}}) => {
    const twitter = social[0].twitter && social[0].twitter;
    const facebook = social[0].facebook && social[0].facebook;
    const linkedin = social[0].linkedin && social[0].linkedin;
    const youtube = social[0].youtube && social[0].youtube;
    const instagram = social[0].instagram && social[0].instagram;

    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""/>
            <h1 className="large">{ name }</h1>
            <p className="lead">{ status } at { company && <span>{company}</span> }</p>
            <p>{ location && <span>{location}</span> }</p>
            <div className="icons my-1">
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                )}

                {twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )}

                {facebook && (
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )}

                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )}

                {youtube && (
                    <a href={youtube} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                )}

                {instagram && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )}
            </div>
        </div>
    );
};


export default ProfileTop;