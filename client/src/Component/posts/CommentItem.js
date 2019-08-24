import React, {Fragment} from 'react';
import {Link, withRouter} from "react-router-dom";
import Moment from "react-moment";

// Redux
import {getProfileById} from "../../actions/profile";
import {removeComment} from "../../actions/post";
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const CommentItem = ({post, comment, getProfileById, removeComment, history, auth}) => {
    return (
        <div className="comments">
            <div className="post bg-white p-1 my-1">
                <div>
                    <span style={{cursor: "pointer"}} onClick={() => {
                        history.push(`/profile`);
                        getProfileById(comment.user);
                    }}>
                        <img
                            className="round-img"
                            src={comment.avatar}
                            alt=""
                        />
                        <h4>{comment.name}</h4>
                    </span>
                </div>
                <div>
                    <p className="my-1">
                        {comment.text}
                    </p>
                    <p className="post-date">
                        Posted on <Moment format="MM/DD/YYYY">{comment.date}</Moment>
                    </p>
                    {!auth.loading && (auth.user._id === comment.user) && <Fragment>
                        <button onClick={() => {
                            removeComment(post._id, comment._id);
                        }}
                            type="button"
                            className="btn btn-danger">
                            <i className="fas fa-times"> </i>
                        </button>
                    </Fragment>}
                </div>
            </div>
        </div>
    );
};

CommentItem.propTypes = {
    getProfileById: propTypes.func.isRequired,
    removeComment: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileById, removeComment})(withRouter(CommentItem));