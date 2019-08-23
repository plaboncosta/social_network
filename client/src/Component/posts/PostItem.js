import React, {Fragment} from 'react';
import Moment from "react-moment";
import {withRouter} from 'react-router-dom';

// Redux
import {addLike, deletePost, removeLike} from "../../actions/post";
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {Link} from "react-router-dom";
import {getProfileById} from "../../actions/profile";

const PostItem = ({post: {name, user, avatar, text, date, likes, comments, _id}, auth, addLike, removeLike, deletePost, getProfileById, history}) => {
    return (
        <div className="post bg-white p-1 my-3">
            <div>
                <Link onClick={() => {
                    history.push(`/profile`);
                    getProfileById(user)
                } }>
                    <img
                        className="round-img"
                        src={avatar}
                        alt="avatar"
                    />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">
                    {text}
                </p>
                <p className="post-date">
                    Posted on <Moment format="MM/DD/YYYY">{date}</Moment>
                </p>
                <button type="button" onClick={e => addLike(_id)} className="btn btn-light">
                    <i className="fas fa-thumbs-up"> </i> {' '}
                    {likes.length > 0 &&
                            <span>{likes.length}</span>
                        }
                </button>
                <button type="button" onClick={e => removeLike(_id)} className="btn btn-light">
                    <i className="fas fa-thumbs-down"> </i>
                </button>
                <a href={`/post/${_id}`} className="btn btn-primary">
                    Discussion {comments.length > 0 && (
                    <span className='comment-count'>{comments.length}</span>
                )}
                </a>
                {!auth.loading && auth.user._id === user && <Fragment>
                    <button
                        type="button" onClick={() => deletePost(_id)}
                        className="btn btn-danger">
                        <i className="fas fa-times"> </i>
                    </button>
                </Fragment>}
            </div>
        </div>
    );
};

PostItem.propTypes = {
    auth: propTypes.object.isRequired,
    post: propTypes.object.isRequired,
    addLike: propTypes.func.isRequired,
    removeLike: propTypes.func.isRequired,
    deletePost: propTypes.func.isRequired,
    getProfileById: propTypes.func.isRequired
};

const mapstateToProps = state => ({
    auth: state.auth
});

export default connect(mapstateToProps, {addLike, removeLike, deletePost, getProfileById})(withRouter(PostItem));