const express = require('express');
const mongoose = require('mongoose');
const dotenv =require('dotenv');
dotenv.config();

const Task = require('./models/Task')
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    return res.send({message:"Hey There Welcome!"})
})

// Create a Task
app.post('/tasks',async(req,res)=>{
    try{
        const newtask = await Task.create(req.body);
        if(!newtask){
            return res.status(400).send("All The Fields Must be Filled")
        }
        return res.status(201).json({newtask,message:"Task Creation Successful!"});

    }
    catch(err){
        console.error(err)
        return res.status(400).json({error: err.message})
    }
})


// GetAllTasks
app.get('/tasks',async(req,res)=>{
    try{
        const tasks = await Task.find();
        if(!tasks){
            return res.status(500).json("Internal Server Error!")
        }
        return res.status(200).json(tasks);

    }
    catch(err){
        console.error(err)
        return res.status(404).json({error: err.message})
    }
})

// Get A Single Task

app.get('/tasks/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const task = await Task.findById(id);
        if(!task){
            return res.status(500).json("Not Found")
        }
        return res.status(200).json(task);

    }
    catch(err){
        console.error(err)
        return res.status(404).json({error: err.message})
    }
})


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("✔️  MongoDB Connection Successful!"))
.catch((err)=> console.error("❌ Connection Failed!"))


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})