import React, {useState} from 'react';

// Redux
import {addComment} from "../../actions/post";
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const AddComment = ({post: {_id}, addComment}) => {
    const [text, setFormData] = useState('');

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={e => {
                e.preventDefault();
                addComment(_id, {text});
                setFormData('');
            }}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        required
                        value={text}
                        onChange={e => setFormData(e.target.value)}
                    />
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};

AddComment.propTypes = {
    addComment: propTypes.func.isRequired
};

export default connect(null, {addComment})(AddComment);