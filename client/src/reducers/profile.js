import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: {},
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        repos: [],
        loading: false,
        error: {},
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload.profiles,
        loading: false,
      };
    default:
      return state;
  }
}
