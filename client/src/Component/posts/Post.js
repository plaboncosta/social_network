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
import PostItem from "./PostItem";

const Post = ({getPost, post: {post, loading}, getProfileById, history}) => {
    const id = localStorage.getItem('post_id');

    useEffect(() => {
        getPost(id);
    }, [getPost]);

    return loading ? <Spinner/> : <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <PostItem post={post} showActions={false} />
           {/* <div>
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

                <div className="post-form">
                    <div className="bg-primary p">
                        <h3>Leave A Comment</h3>
                    </div>
                    <form className="form my-1">
          <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Comment on this post"
              required
          />
                        <input type="submit" className="btn btn-dark my-1" value="Submit"/>
                    </form>
                </div>

                <div className="comments">
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <a href="profile.html">
                                <img
                                    className="round-img"
                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                    alt=""
                                />
                                <h4>John Doe</h4>
                            </a>
                        </div>
                        <div>
                            <p className="my-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                possimus corporis sunt necessitatibus! Minus nesciunt soluta
                                suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                                dolor? Illo perferendis eveniet cum cupiditate aliquam?
                            </p>
                            <p className="post-date">
                                Posted on 04/16/2019
                            </p>
                        </div>
                    </div>

                    <div className="post bg-white p-1 my-1">
                        <div>
                            <a href="profile.html">
                                <img
                                    className="round-img"
                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                    alt=""
                                />
                                <h4>John Doe</h4>
                            </a>
                        </div>
                        <div>
                            <p className="my-1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                                possimus corporis sunt necessitatibus! Minus nesciunt soluta
                                suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
                                dolor? Illo perferendis eveniet cum cupiditate aliquam?
                            </p>
                            <p className="post-date">
                                Posted on 04/16/2019
                            </p>
                            <button
                                type="button"
                                className="btn btn-danger"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>*/}
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