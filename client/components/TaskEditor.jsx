import React from 'react';
import DatePicker from 'react-datepicker'
import "../styles/react-datepicker.css"
import ColorPicker from './ColorPicker.jsx'
import FileUpload from './FileUploader.jsx';
import '../styles/TaskEditor.less'
import moment from 'moment'

const COLORS = [ '#FF8A80','#FFD180','#FFFF8D', '#CCFF90']

class TaskEditor extends React.Component{

    constructor (props){
        super(props);
        this.state={
            title:'',
            text:'',
            file:[],
            files_list:[],
            color: COLORS[0],
            start_date: new Date(),
            stop_date: new Date(),
            button_name: "Add"
        }
        this.handleFileChange=this.handleFileChange.bind(this);
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

    handleColorChange(color) {
        if (this.props.task)
            this.props.task.status=COLORS.indexOf(color)
        this.setState({ color });
    };

    handleFileChange(event){
        const file = event.target.files[0];
        const nf=this.state.file;
        nf.push(file);
        const f=this.state.files_list;
        if(f.indexOf(file.name)==-1)
            f.push(file.name);
        this.setState({file:nf, files_list: f});
    };


    handleNoteAdd() {
        const status=COLORS.indexOf(this.state.color)
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            status: status,
            start_date: moment(this.state.start_date).format('yyyy-MM-DD'),
            stop_date: moment(this.state.stop_date).format('yyyy-MM-DD'),
            file: this.state.file,
            files_list: this.state.files_list
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
                stop_date: new Date(),
                files_list:[],
                file: []});
    };

    render(){
        let listItems, files;
        if (this.props.task){
            
            if (!this.state.file) files=[]
            else files=this.state.file
            this.state={
                title:this.props.task.title,
                text:this.props.task.text,
                color: COLORS[this.props.task.status],
                start_date: this.props.task.start_date,
                stop_date: this.props.task.stop_date,
                files_list: this.props.task.files_list,
                file: files,
                button_name: 'Update'
            }
            console.log(this.state)
            listItems = this.state.files_list.map((item,i)=> 
            {
                return (<div>
                    <label className='Note__text'>{item}</label>
                    <button onClick={this.props.onFileDownload.bind(null, item, this.props.task.id)} >Download</button>
                </div>)  
            });
        }
        else{
            console.log(this.state.files_list)
            listItems = this.state.files_list.map((item,i)=> 
            {
                return( <div>
                    <label className='Note__text'>{item}</label>
                    </div>)
            });
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
                <FileUpload 
                    onChange={this.handleFileChange}
                />
                <h4>Uploaded earlier: </h4>
                {listItems}
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