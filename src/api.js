import axios from 'axios';

// create an Axios instance configured to communicate with our Spring Boot backend.
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/v1/feed-calculator',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;