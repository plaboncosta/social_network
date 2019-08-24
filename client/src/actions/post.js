import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    POST_DELETE,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

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


// Add Post
export const addPost = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('api/post', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Added Successfully!', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Get Post
export const getPost = id => async dispatch => {
    localStorage.removeItem('post_id');
    localStorage.setItem('post_id', id);
    try {
        const res = await axios.get(`api/post/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Add Comment
export const addComment = (id, formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(`api/post/comment/${id}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data.comments
        });
        dispatch(setAlert('Comment Added Successfully!', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Remove Comment
export const removeComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`api/post/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });
        dispatch(setAlert('Comment Deleted Successfully!', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Delete post
export const deletePost = id => async dispatch => {
    if (window.confirm('Are you sure you want to delete this post?')) {
        try {
            const res = await axios.delete(`api/post/${id}`);

            dispatch({
                type: POST_DELETE,
                payload: id
            });

            dispatch(setAlert('Post deleted successfully!', 'success'));
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
};