import React from 'react';
import './Task.less';
import moment from 'moment'

class Task extends React.Component{
    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Note' style={style}>
                <span className='Note__del-icon' onClick={this.props.onDelete}> × </span>
                <span className='Note__modif-icon' onClick={this.props.onEdit}> M </span>
                <h4 className='Note__title'>{this.props.title}</h4>
                <h4 className='Note__title'>{moment(this.props.start_date).format('yyyy-MM-DD')}</h4>
                <h4 className='Note__title'>{moment(this.props.stop_date).format('yyyy-MM-DD')}</h4>
                <div className='Note__text'>{this.props.children}</div>
                
            </div>
        );
    }
};

export default Task;