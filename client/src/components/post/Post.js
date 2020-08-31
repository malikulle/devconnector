import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";
import { getPost } from "../../actions/postActions";
import { useParams, Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({ getPost, post }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [id, getPost]);

  if (!post) {
    return <Spinner />;
  }

  return (
    <div>
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
        </div>
      </div>
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map(item =>(
          <CommentItem postId={post._id} key={item._id} comment={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post.post,
});

export default connect(mapStateToProps, { getPost })(Post);
