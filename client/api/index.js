import axios from 'axios';
import {apiPrefix} from '../../api_config.json';

export default {
    loadTasks() {
        return axios.get(`${apiPrefix}/tasks`);
    },

    createTask(data) {
        return axios.post(`${apiPrefix}/tasks`, data);
    },

    deleteTask(id) {
        return axios.delete(`${apiPrefix}/tasks?id=${id}`);
    },

    filterTask(status){
        return axios.get(`${apiPrefix}/tasks?status=${status}`);
    },

    updateStopDate(id,date){
        return axios.post(`${apiPrefix}/tasks?id=${id}`, date);
    }

}