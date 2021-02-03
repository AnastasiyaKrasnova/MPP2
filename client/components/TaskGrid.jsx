import React from 'react';
import Task from './Task.jsx';

import Masonry from 'react-masonry-component';

import './TaskGrid.less';

class TaskGrid extends React.Component{
    render() {
        const masonryOptions = {
            itemSelector: '.Note',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

        const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']
        console.log(this.props.tasks)
        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    this.props.tasks.map(task =>
                        <Task
                            key={task.id}
                            title={task.title}
                            onDelete={this.props.onNoteDelete.bind(null, task)}
                            color={COLORS[task.status]}
                        >
                            {task.text}
                        </Task>
                    )
                }
            </Masonry>
        );
    }
};

export default TaskGrid;