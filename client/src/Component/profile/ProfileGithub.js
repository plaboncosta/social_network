import React, {Fragment, useEffect} from 'react';
import Spinner from '../layout/spinner';

// Redux
import {getGithubRepos} from "../../actions/profile";
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const ProfileGithub = ({username, getGithubRepos, repos}) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos]);

    const repository = repos.map(repos => (
        <div className="repo bg-white p-1 my-1" key={repos.id}>
            <div>
                <h4><a href={repos.html_url} target="_blank"
                       rel="noopener noreferrer">{repos.name}</a></h4>
                {repos.description && <p>
                    {repos.description}
                </p>}
            </div>
            <div>
                <ul>
                    <li className="badge badge-primary">Stars: {repos.stargazers_count}</li>
                    <li className="badge badge-dark">Watchers: {repos.watchers_count}</li>
                    <li className="badge badge-light">Forks: {repos.forks_count}</li>
                </ul>
            </div>
        </div>
    ));

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
            </h2>
            {repos.length > 0 ? <Fragment>
                {repository}
            </Fragment> : <Spinner/>}
        </div>
    );
};

ProfileGithub.propTypes = {
    repos: propTypes.array.isRequired,
    getGithubRepos: propTypes.func.isRequired
};

const mapStateToProps = state => ({
    repos: state.profile.repos,
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);