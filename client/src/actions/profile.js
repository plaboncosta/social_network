import {PROFILE_SUCCESS, PROFILE_ERROR, PROFILE_UPDATE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_PROFILE, GITHUB_REPOS} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

// Get Current User Profile
export const getCurrentUserProfile = () => async dispatch => {
    try {
        const res = await axios.get('api/profile/me');

        dispatch({
            type: PROFILE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Create Profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('api/profile', JSON.stringify(formData), config);

        dispatch({
            type: PROFILE_SUCCESS,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated Successfully!' : 'Profile Created Successfully!', 'success'));

        if (!edit) history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('api/profile/experience', JSON.stringify(formData), config);

        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Experience added successfully!', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put('api/profile/education', JSON.stringify(formData), config);

        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Education added successfully!', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Delete Experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/experience/delete/${id}`);

        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Experience removed successfully!', 'success'));
    } catch (err) {

    }
};


// Delete Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`api/profile/education/delete/${id}`);

        dispatch({
            type: PROFILE_UPDATE,
            payload: res.data
        });

        dispatch(setAlert('Education removed successfully!', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Delete Profile and Account
export const deleteAccount = () => async dispatch => {
    if (window.confirm('Are you sure? This is can not be undone!')) {
        try {
            await axios.delete(`api/profile/delete`);

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: ACCOUNT_DELETED });

            dispatch(setAlert('Your Account deleted permanently!', 'warning'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }

};


// Get All Profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    try {
        const res = await axios.get(`api/profile`);

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Get Profile By ID
export const getProfileById = (id) => async dispatch => {
    localStorage.removeItem('profile_id');
    try {
        const res = await axios.get(`api/profile/${id}`);
        localStorage.setItem('profile_id', res.data._id);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Get Github Repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`api/profile/github/${username}`);

        dispatch({
            type: GITHUB_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
