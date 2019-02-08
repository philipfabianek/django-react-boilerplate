import axios from "axios";

export const setPosts = (posts) => ({
  type: "SET_POSTS",
  posts,
});

export const startSetPosts = () => {
  return (dispatch, getState) => {
    return axios.get('/api_posts/fetch-posts')
      .then(({ data }) => {
        dispatch(setPosts(data.posts))
      }).catch((err) => {
        console.log(err);
      });
  }
};
