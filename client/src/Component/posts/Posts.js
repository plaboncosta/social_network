import React, {useEffect, Fragment} from 'react';
import Spinner from '../layout/spinner';

// Redux
import {getAllPosts} from "../../actions/post";
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// Component
import PostItem from "./PostItem";

const Posts = ({getAllPosts, post: {posts, loading}}) => {
    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return loading ? <Spinner/> : <Fragment>
        <h1 className="large text-primary">
            Posts
        </h1>
        <p className="lead"><i className="fas fa-user"> </i> Welcome to the community!</p>

        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1">
                  <textarea
                      name="text"
                      cols="30"
                      rows="5"
                      placeholder="Create a post"
                  />
                <input type="submit" className="btn btn-dark my-3" value="Submit"/>
            </form>
        </div>
        <div className="posts">
            {posts.length > 0 && <Fragment>
                {posts.map(post => (
                    <PostItem key={post._id} post={post}/>
                ))}
            </Fragment>}
        </div>
    </Fragment>;
};

Posts.propTypes = {
    getAllPosts: propTypes.func.isRequired,
    post: propTypes.object.isRequired
};

const mapstateToProps = state => ({
    post: state.post
});

export default connect(mapstateToProps, {getAllPosts})(Posts);