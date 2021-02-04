import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const TaskActions = {
    loadTasks() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_REQUEST
        });

        api.loadTasks()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_SUCCESS,
                tasks: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err
            })
        );
    },

    createTask(note) {
        api.createTask(note)
        .then(() =>
            this.loadTasks()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteTask(noteId) {
        api.deleteTask(noteId)
        .then(() =>
            this.loadTasks()
        )
        .catch(err =>
            console.error(err)
        );
    },

    updateTask(note) {
        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_REQUEST
        });
        api.updateTask(note)
        .then(({ data }) =>
        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_SUCCESS,
            tasks: data
        })
    )
    .catch(err =>
        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_FAIL,
            error: err
        })
    );
    },

    filterTask(status){

        AppDispatcher.dispatch({
            type: Constants.LOAD_TASKS_REQUEST
        });

        api.filterTask(status)
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_SUCCESS,
                tasks: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_TASKS_FAIL,
                error: err
            })
        );
    },
};

export default TaskActions;