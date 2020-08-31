import axios from "axios";
import { setAlert } from "./alertActions";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILES,
} from "./types";

//Get Current User profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/profile/me");

    dispatch({ type: GET_PROFILE, payload: data.profile });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Crate or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post("/api/profile", formData);

    dispatch({
      type: GET_PROFILE,
      payload: data,
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((item) => {
        dispatch(setAlert(item.msg, "danger"));
      });
    }
  }
};

// add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.put("/api/profile/experience", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((item) => {
        dispatch(setAlert(item.msg, "danger"));
      });
    }
  }
};
// add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const { data } = await axios.put("/api/profile/education", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    if (error.response.data && error.response.data.errors) {
      error.response.data.errors.forEach((item) => {
        dispatch(setAlert(item.msg, "danger"));
      });
    }
  }
};

//Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: data.profile });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/profile/education/${id}`);

    dispatch({ type: UPDATE_PROFILE, payload: data.profile });
    dispatch(setAlert("Education Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure ? This can not be undone !")) {
    try {
      await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_ACCOUNT });
      dispatch(setAlert("Account Removed", "success"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};

// Getl All Profile
export const getAProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const { data } = await axios.get("/api/profile");

    dispatch({ type: GET_PROFILES, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/profile/user/${userId}`);
    dispatch({ type: GET_PROFILE, payload: data.profile });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
