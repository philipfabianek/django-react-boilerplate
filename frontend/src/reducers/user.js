import { setAxiosHeaders } from '../utils/axios';

export default (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      // same as login but might come handy in future
      return action.user;
    case "LOGIN":
      setAxiosHeaders();
      return action.user;
    case "LOGOUT":
      setAxiosHeaders();
      return {};
    default:
      return state;
  }
};
