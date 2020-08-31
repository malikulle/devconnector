import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from "../../actions/postActions";

const CommentItem = ({ postId, comment, auth, deleteComment }) => {
  return (
    <div className="comments">
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${comment.user}`}>
            <img className="round-img" src={comment.avatar} alt="" />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{comment.text}</p>
          <p className="post-date">
            <Moment format="YYYY/MM/DD">{comment.date}</Moment>
          </p>
          {auth.user && comment.user === auth.user._id && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteComment(postId, comment._id)}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
