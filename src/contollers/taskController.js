import mongoose from "mongoose";
import Task from "../model/taskModel.js";


async function handelTaskCreate(req,res) {

    try {
        const {title,description}=req.body;


       if(!title || !description){
        return res.status(400).json({message:"Require All Field"})
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        const newTask= new Task({
            title:title,
            description:description,
            author:req.user._id
        })
        await newTask.save()

        if(newTask){
            return res.status(202).json({
            status:"success",
            message: "Your Task Create successful",
            task: newTask,
        });
        }

    } catch (error) {
       console.error("Task Create error:", error.message);
        return res.status(500).send("Error Task Create ");
    }
    
}


async function handelGetAllTask(req,res) {
    try {
        const userId=req.user._id
        console.log("req userId : ",userId)
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: You Can Create First Task" });
        }
        
        const getTask=await Task.find({author:(userId)});


        if(getTask){
            return res.status(202).json({
            status:"success",
            message: "Your Task Get successful",
            task: getTask,
            });
        }else{
            return res.status(202).json({
            status:"success",
            message: "No Task Here",
            });
        }

    } catch (error) {
         console.error("Get All Task  error:", error.message);
        return res.status(500).send("Error Get All Task");
    }
}


async function handelDeleteTask(req,res) {
    try {
        const {taskId}=req.params
        const userId=req.user._id


        const task=await Task.findById(taskId);
        if (!task) {
            return res.status(500).json({ message: "Task not found!" });
        }


        if(task.author.toString() !== userId.toString()){
        return res.status(403).json({ message: "Unauthorized! You can only delete your own blog." });
        }
        const taskObjectId=new mongoose.Types.ObjectId(taskId);

        const deleteTask=await Task.findByIdAndDelete(taskObjectId);

         if(deleteTask){
            return res.status(202).json({
            status:"success",
            message: "Your Task Delete successful",
            task: deleteTask,
            });
        }
    } catch (error) {
        console.error("Delete Task  error:", error.message);
        return res.status(500).send("Error Delete Task");
    }
}
export {
    handelTaskCreate,
    handelGetAllTask,
    handelDeleteTask
}