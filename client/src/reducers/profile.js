import {PROFILE_SUCCESS, PROFILE_ERROR, CLEAR_PROFILE, PROFILE_UPDATE, GET_PROFILES, GET_PROFILE, GITHUB_REPOS} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
};

export default (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case PROFILE_SUCCESS:
        case PROFILE_UPDATE:
        case GET_PROFILE:
            return {...state, profile: payload, loading: false};
        case PROFILE_ERROR:
            return {...state, loading: false, error: payload};
        case CLEAR_PROFILE:
            return {...state, repos: [], profile: null, loading: false};
        case GET_PROFILES:
            return {...state, profiles: payload, loading: false};
        case GITHUB_REPOS:
            return {...state, repos: payload, loading: false};
        default:
            return state;
    }
};
