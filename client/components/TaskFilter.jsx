import React from 'react';
import './TaskEditor.less'

class TaskFilter extends React.Component{
    constructor (props){
        super(props);
        this.state={
            status: 0
        }
        this.handleNoteAdd=this.handleNoteAdd.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleColorChange=this.handleColorChange.bind(this);
        this.handleStartDateChange=this.handleStartDateChange.bind(this);
        this.handleStopDateChange=this.handleStopDateChange.bind(this);
    };

    handleStatusChange(event) {
        this.setState({ status: event.target.value });
    };

    handleFiltering() {
        const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']
        const status=COLORS.indexOf(this.state.color)
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            status: status
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '', title: '', color: '#FFFFFF' });
    };

    render(){
        return (
            <div className='NoteEditor'>
                <input
                    type='text'
                    className='NoteEditor__title'
                    placeholder='Task title'
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                />
                <textarea
                    placeholder='Task text'
                    rows={5}
                    className='NoteEditor__text'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <DatePicker
                    placeholderText="Beginning of Task"
                    selected={ this.state.start_date}
                    onChange={ this.handleStartDateChange }
                    name="startDate"
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    placeholderText="Deadline of Task"
                    selected={ this.state.stop_date}
                    onChange={ this.handleStopDateChange }
                    name="stopDate"
                    dateFormat="yyyy-MM-dd"
                />
                <div className='NoteEditor__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
                    <button
                        className='NoteEditor__button'
                        disabled={!this.state.text}
                        onClick={this.handleNoteAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
};

export default TaskEditor;