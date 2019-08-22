import {GET_POSTS, POST_ERROR, UPDATE_LIKES} from "./types";
import axios from 'axios';

// Get All Profiles
export const getAllPosts = () => async dispatch => {
    try {
        const res = await axios.get(`api/post`);

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add Like to Post
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/post/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data.likes}
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Remove Like // Unilike
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`api/post/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes: res.data.likes}
        });

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};