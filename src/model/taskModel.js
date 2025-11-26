import mongoose from "mongoose";
import User from "./authModel.js";




const taskSchema=new mongoose.Schema({
    
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    },
    createdat:{
        type:Date,
        default:Date.now
    }
},{ timestamps: true });

const Task=mongoose.model("task",taskSchema);

export default Task
