import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://api.covid19api.com',
});

export default axiosClient;