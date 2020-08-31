import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../actions/postActions";

const PostItem = ({ post, auth, addLike, removeLike, deletePost }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className="round-img" src={post.avatar} alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{post.date}</Moment>
        </p>
        <button
          onClick={() => addLike(post._id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{post.likes.length}</span>
        </button>

        <button
          type="button"
          className="btn btn-light"
          onClick={() => removeLike(post._id)}
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Discussion{" "}
          {post.comments.length > 0 && (
            <span className="comment-count">{post.comments.length}</span>
          )}
        </Link>
        {post.user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deletePost(post._id)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
