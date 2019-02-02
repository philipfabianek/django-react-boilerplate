import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';

import { getCSRFToken } from "./cookies";

const axiosInstance = () => {
  const csrftoken = getCSRFToken();

  const instance = axios.create({
    headers: {
      'Accept': 'application/json; charset=UTF-8',
      'X-CSRFToken': csrftoken,
    },
  });

  return instance;
};

export const AxiosContext = React.createContext({
  axios,
});

export const AxiosProvider = (props) => {
  return (
    <AxiosContext.Provider value={axiosInstance()}>
      {props.children}
    </AxiosContext.Provider>
  );
};

AxiosProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const withAxios = (ChildElement) => {
  return (props) => (
    <AxiosContext.Consumer>
      {axios => <ChildElement axios={axios} {...props} /> }
    </AxiosContext.Consumer>
  );
};

export const WithAxios = (props) => {
  const ChildElement = React.Children.only(props.children);

  return (
    <AxiosContext.Consumer>
      {axios => React.cloneElement(ChildElement, { axios })}
    </AxiosContext.Consumer>
  );
};
