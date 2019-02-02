import axios from "axios";

import { getCSRFToken } from "../utils/cookies";

const csrftoken = getCSRFToken();
axios.defaults.headers.common['Accept'] = 'application/json; charset=UTF-8';
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
