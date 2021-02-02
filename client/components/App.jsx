import React from 'react';

import TaskEditor from './TaskEditor.jsx'
import TaskGrid from './TaskGrid.jsx'

class App extends React.Component{
    render(){
        return (
            <div className='App'>
                <h2 className='App__header'>Task Sheduler</h2>
                <TaskEditor />
                <TaskGrid />
            </div>
        )
    }
};

export default App;