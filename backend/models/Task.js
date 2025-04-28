const mongoose = require('mongoose');


const task = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    priority:
    {
        type:String,
        enum:["low","medium","high"],
        default:"medium"
    }

})

const Task = mongoose.model("Task", task);
module.exports = Task;
