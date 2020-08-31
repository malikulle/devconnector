import React, { useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/postActions";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  if (post.loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <PostForm />
      <div className="posts">
        {post.posts &&
          post.posts.map((item) => <PostItem key={item._id} post={item} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
