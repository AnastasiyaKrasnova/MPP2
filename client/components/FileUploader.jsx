import React from 'react';
import './FileUploader.css';

class FileUploader extends React.Component{

    /*uploadFile (){
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.post(`${apiPrefix}/tasks/files`, formData)
        .then(res => {
            console.log(res);
            getFile({ name: res.data.name,
                     path: `${apiPrefix}` + res.data.path
                   })
        }).catch(err => console.log(err))
    }*/
    render(){
        return (
            <div>
                <input type="file" onChange={this.props.onChange.bind(null)} />                
            </div>
        );
    }
    
}
export default FileUploader;