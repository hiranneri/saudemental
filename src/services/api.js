const axios = require('axios');

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

const appRequests = axios.create({
    baseURL: 'http://localhost:3001'
});

module.exports = {api:api, appRequests:appRequests}