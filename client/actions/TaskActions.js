import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';
import download from 'js-file-download';

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
        .then((res)=>{
            console.log(res)
            const formData = new FormData();        
            formData.append('file', note.file);
            api.uploadFile(formData,res.data._id)
            .then(() =>
                    this.loadTasks()
                )
            .catch(err =>
                    console.error(err)
            );
        }).catch(err => console.log(err))

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

    downloadFile(filename,id){
        api.downloadFile(filename,id)
        .then(res => {
            download(res.data, filename);
        })
        .catch(err => {
           console.log(err);
        });
    }
};

export default TaskActions;