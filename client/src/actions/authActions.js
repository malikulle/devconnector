import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alertActions";
import setAuthToken from "../utils/setAuthToken";

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users", { name, email, password });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user: data.user, token: data.token },
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
    try {
      const { data } = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: data.user });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

export const LoginSucces = ({ email, password }) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/auth", { email, password });
    setAuthToken(data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data.user, token: data.token },
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
