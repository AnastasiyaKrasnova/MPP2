import React from 'react';
import './Task.less';

class Task extends React.Component{
    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Note' style={style}>
                <span className='Note__del-icon' onClick={this.props.onDelete}> × </span>
                <h4 className='Note__title'>{this.props.title}</h4>
                <div className='Note__text'>{this.props.children}</div>
            </div>
        );
    }
};

export default Task;