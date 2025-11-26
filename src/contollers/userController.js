import bcrypt from 'bcrypt'
import User from '../model/authModel.js'
import { setToken } from '../service/authUser.js'


async function handelUserCreate(req,res) {
    try {
        const {name,email,password}=req.body

        if(!name || !email || !password){
        return res.status(400).json({message:"Require All Field"})
        }
        
        const findEmail=await User.findOne({email})
        if(findEmail){
            return res.status(400).json({
            status: 'fail',
            message: 'Email already exists',
      });
        }


        const salt = await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(password,salt)


        const newUser= await User.create({
            name:name,
            email:email,
            password:hashPassword,
        })
        console.log("user Craete :",newUser)

        res.status(202).json({
            status: "success",
            message: "User Create Successfull",
            user:newUser
        })


    } catch (error) {
        res.status(500).json({message:"Error Created User",error:error.message});
    }
}



async function handelLogin(req,res) {
    try {
        const {email,password}=req.body;

        if(!email || !password){
        return res.status(400).json({message:"Require All Field"})
        }


        const newUser = await User.findOne({ email });

        if (!newUser) {
                return res.status(400).json({ message: "Invalid Email" });
            }

        const isMatch = await bcrypt.compare(password, newUser.password);


        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        
        const token=setToken(newUser)

        return res.status(200).json({
            status:"success",
            message: "Your login was successful",
            name: newUser.name,
            userid:newUser._id,
            token:token
        });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).send("Error Login ");
    }
}


export  {
    handelUserCreate,
    handelLogin

}