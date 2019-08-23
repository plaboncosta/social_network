import React, {useState} from 'react';

// Redux
import {connect} from 'react-redux';
import {addPost} from "../../actions/post";
import propTypes from 'prop-types';

const PostAdd = ({addPost}) => {
    const [formData, setFormData] = useState({text: ''});
    const {text} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        addPost(formData);
        setFormData({text: ''});
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={e => onSubmit(e)}>
                  <textarea
                      name="text"
                      cols="30"
                      rows="5"
                      placeholder="Create a post"
                      value={text}
                      onChange={e => onChange(e)}
                  />
                <input type="submit" className="btn btn-dark my-3" value="Submit"/>
            </form>
        </div>
    );
};

PostAdd.propTypes = {
    addPost: propTypes.func.isRequired
};

export default connect(null, {addPost})(PostAdd);