const Joi=require('@hapi/joi');
const Task=require('../model/Task');

const schema=Joi.object({
    title: Joi.string().max(255).required(),
    text: Joi.string().max(255).required(),
    start_date: Joi.date().default(Date.now),
    stop_date: Joi.date(),
    status: Joi.number().max(3).default(0),
    files_list: Joi.array().items(Joi.string())
});

exports.add=async (data)=>{
    const {error}=schema.validate(data);
    if (error) return null;

    const task=new Task({
        title: data.title,
        text: data.text,
        start_date: data.start_date,
        stop_date: data.stop_date,
        status: data.status,
        files_list: data.files_list
    });

    try{
        const savedTask=await task.save();
        return savedTask;

    }catch(err){
        return null;
    }
}

exports.listAll=async()=>{
    try{
        const tasks=await Task.find();
        return tasks;

    }catch(err){
        return null;
    }
}

exports.filterByStatus=async(status)=>{
    try{
        const tasks=await Task.find({status: status});
        return tasks;

    }catch(err){
        return null;
    }
}

exports.updateDate=async(id,date)=>{
    try{
        const task=await Task.findByIdAndUpdate({_id : id}, {stop_date: date}, {upsert: false})
        return task;
    }
    catch(err) {
    return null;
    }
}
exports.delete=async(id)=>{
    try{
        const task=await Task.findByIdAndRemove({_id: id});
        return true;
    }
    catch(err) {
        return null;
    }
}
