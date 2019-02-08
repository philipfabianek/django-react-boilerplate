import axios from "axios";

export const setUser = (user) => ({
  type: "SET_USER",
  user,
});

export const startSetUser = () => {
  return (dispatch, getState) => {
    return axios.get('/initial-state')
      .then(({ data }) => {
        dispatch(setUser(data))
      }).catch((err) => {
        console.log(err);
      });
  }
};


export const login = (user) => ({
  type: "LOGIN",
  user,
});

export const logout = () => ({
  type: "LOGOUT",
});
