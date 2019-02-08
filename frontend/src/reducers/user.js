export default (state = {}, action) => {
  switch (action.type) {
    case "SET_USER":
      // same as login but might come handy in future
      return action.user;
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
