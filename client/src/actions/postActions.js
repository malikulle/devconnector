import axios from "axios";
import { setAlert } from "./alertActions";
import {
  GET_POSTS,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";

// Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/posts");

    dispatch({ type: GET_POSTS, payload: data.posts });
  } catch (error) {}
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/posts/like/${postId}`);
    console.log(data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: data.likes },
    });
  } catch (error) {
    const errors = error.response.data.msg;
    dispatch(setAlert(errors, "danger"));
  }
};

export const removeLike = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: data.likes },
    });
  } catch (error) {
    const errors = error.response.data.msg;
    dispatch(setAlert(errors, "danger"));
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    const errors = error.response.data.msg;
    dispatch(setAlert(errors, "danger"));
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/posts", formData);

    dispatch({ type: ADD_POST, payload: data.post });

    dispatch(setAlert("Post Created", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
  }
};

// Get Post
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: data.post });
  } catch (error) {}
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/api/posts/comment/${postId}`, formData);

    dispatch({ type: ADD_COMMENT, payload: data.comments });

    dispatch(setAlert("Comment Created", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({ type: DELETE_COMMENT, payload: commentId });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (error) {
    const errors = error.response.data.msg;
    dispatch(setAlert(errors, "danger"));
  }
};
