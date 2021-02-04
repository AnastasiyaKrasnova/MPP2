import React from 'react';
import DatePicker from 'react-datepicker'
import "./react-datepicker.css"
import ColorPicker from './ColorPicker.jsx'
import './TaskEditor.less'
import moment from 'moment'

const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']

class TaskEditor extends React.Component{
    constructor (props){
        super(props);
        this.state={
            title:'',
            text:'',
            color: COLORS[0],
            start_date: new Date(),
            stop_date: new Date(),
            button_name: "Add"
        }
        this.handleNoteAdd=this.handleNoteAdd.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
        this.handleColorChange=this.handleColorChange.bind(this);
        this.handleStartDateChange=this.handleStartDateChange.bind(this);
        this.handleStopDateChange=this.handleStopDateChange.bind(this);
    };

    handleTextChange(event) {
        if (this.props.task)
            this.props.task.text=event.target.value
        this.setState({ text: event.target.value });
    };

    handleTitleChange(event) {
        if (this.props.task)
            this.props.task.title=event.target.value
        this.setState({ title: event.target.value });
    };

    handleStartDateChange(date) {
        if (this.props.task)
            this.props.task.start_date=date
        this.setState({ start_date: date})
    };
    handleStopDateChange(date) {
        if (this.props.task)
            this.props.task.stop_date=date
        this.setState({ stop_date: date})
    };

    handleColorChange(color) {
        if (this.props.task)
            this.props.task.status=COLORS.indexOf(color)
        this.setState({ color });
    };

    handleNoteAdd() {
       
        const status=COLORS.indexOf(this.state.color)
        console.log('OK')
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            status: status,
            start_date: moment(this.state.start_date).format('yyyy-mm-dd'),
            stop_date: moment(this.state.stop_date).format('yyyy-mm-dd')
        };
        if (this.props.task){
            newNote.id=this.props.task.id
            this.props.task=null
        }
        this.props.onNoteAdd(newNote);
        this.setState({ text: '', 
                title: '', 
                color: COLORS[0], 
                button_name:"Add", 
                start_date: new Date(),
                stop_date: new Date()});
    };

    render(){
        if (this.props.task){
            this.state={
                title:this.props.task.title,
                text:this.props.task.text,
                color: COLORS[this.props.task.status],
                start_date: this.props.task.start_date,
                stop_date: this.props.task.stop_date,
                button_name: 'Update'
            }
            console.log(this.props.task.status)
        }
        
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
                    selected={ moment(this.state.start_date).toDate()}
                    onChange={ this.handleStartDateChange }
                    name="startDate"
                    dateFormat="yyyy-MM-dd"
                />
                <DatePicker
                    placeholderText="Deadline of Task"
                    selected={ moment(this.state.stop_date).toDate()}
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
                        {this.state.button_name}
                    </button>
                </div>
            </div>
        );
    }
};

export default TaskEditor;