import React from 'react';

import TaskEditor from './TaskEditor.jsx'
import TaskGrid from './TaskGrid.jsx'
import TasksStore from '../stores/TasksStore.js'
import TaskActions from '../actions/TaskActions';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: TasksStore.isLoading(),
        tasks: TasksStore.getTasks()
    };
}

class App extends React.Component{

    constructor (props){
        super(props);

        const info=getStateFromFlux();
        this.state={
            tasks:info.tasks,
            isLoading:info.isLoading
        }
        this._onChange=this._onChange.bind(this);
    }

    componentWillMount() {
        TaskActions.loadTasks()
    }

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
    }

    handleNoteDelete(task) {
        TaskActions.deleteTask(task.id);
    }

   handleNoteAdd(taskdata){
        TaskActions.createTask(taskdata);
   }

   handleFiltering(status){
       TaskActions.filterTask(status);
   }
    render(){
        return (
            <div className='App'>
                <h2 className='App__header'>Task Sheduler</h2>
                <TaskEditor onNoteAdd={this.handleNoteAdd} />
                
                <TaskGrid tasks={this.state.tasks} onNoteDelete={this.handleNoteDelete} />
            </div>
        )
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
};



export default App;