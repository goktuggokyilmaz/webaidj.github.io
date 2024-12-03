const BASE_URL = 'https://cheetah-awaited-jaguar.ngrok-free.app';

const ServiceConstants = {
    BASE_URL: BASE_URL,
    GET_USERS: `${BASE_URL}/api/users`,
    GET_POSTS: `${BASE_URL}/api/posts`,
    CREATE_USER: `${BASE_URL}/api/users/create`,
    CREATE_POST: `${BASE_URL}/api/posts/create`,
    UPDATE_USER: `${BASE_URL}/api/users/update`,
    UPDATE_POST: `${BASE_URL}/api/posts/update`,
    DELETE_USER: `${BASE_URL}/api/users/delete`,
    DELETE_POST: `${BASE_URL}/api/posts/delete`,
    PROCESS_PLAYLIST: `${BASE_URL}/process-playlist`,
    GENERATE_PLAYLIST: `${BASE_URL}/generate-playlist`,
    GENERATE_TRANSITION: `${BASE_URL}/generate-transition`,
    CHECK_FILE: `${BASE_URL}/check-file`,
    GET_TIMES: `${BASE_URL}/get-times`,
};

export default ServiceConstants;