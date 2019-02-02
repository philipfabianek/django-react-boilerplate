import Cookies from 'js-cookie';

export const getCSRFToken = () => {
  const csrftoken = Cookies.get('csrftoken');
  if (!csrftoken) {
    console.error('No csrftoken found');
    return '';
  }
  return csrftoken;
};
