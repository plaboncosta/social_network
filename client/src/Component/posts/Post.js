import React, {Fragment, useEffect} from 'react';
import Spinner from '../layout/spinner';
import {withRouter} from 'react-router-dom';

// Redux
import {getPost} from "../../actions/post";
import {getProfileById} from "../../actions/profile";
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {Link} from "react-router-dom";

// Component
// import PostItem from "./PostItem";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";

const Post = ({getPost, post: {post, loading}, getProfileById, history}) => {
    const id = localStorage.getItem('post_id');

    useEffect(() => {
        getPost(id);
    }, [getPost]);

    return loading ? <Spinner/> : <Fragment>
        {/*<Link to="/posts" className="btn">Back To Posts</Link>
            <PostItem post={post} showActions={false} />*/}
        <div>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to="#!" onClick={() => {
                        history.push('/profile');
                        getProfileById(post.user);
                    }}>
                        <img
                            className="round-img"
                            src={post.avatar}
                            alt=""
                        />
                        <h4>{post.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">
                        {post.text}
                    </p>
                </div>
            </div>
            <AddComment post={post} />
            {post.comments.map(comment => (
                <CommentItem post={post} key={comment._id} comment={comment}/>
            ))}
        </div>
    </Fragment>
};

Post.propTypes = {
    post: propTypes.object.isRequired,
    getPost: propTypes.func.isRequired,
    getProfileById: propTypes.func.isRequired
};

const mapstateToProps = state => ({
    post: state.post
});

export default connect(mapstateToProps, {getPost, getProfileById})(withRouter(Post));