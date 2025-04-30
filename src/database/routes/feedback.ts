import express,{ Express } from "express";
import users from "../model/feedback";
import feedback from "../model/feedback";

const feedbackRouter = express.Router();

feedbackRouter.post('/feedbacks', async (req:any,res)=>{
    try {
        const user = req?.user
        const reqData = req.body
        const user_name = user.name
        
        if(user_name.length === 0 || !user_name){
            return res.status(400).send({message:"Please enter your nickname"})
        }

        const rating = reqData.rating
        if(rating === 0 || !rating){
            return res.status(400).send({message : "Please enter your rating"})
        } 

        const review = reqData.review
        if(review === 0 || !review) {
            return res.status(400).send({message : "please enter your review"})
        }

      

        const createUserObject : any = {
            user_id:user?.id,
            user_name : user_name,
            rating : rating, 
            review : review,
           
        }

        const createUsers = await feedback.create(createUserObject)
        res.status(200).send({message:"Comment stored successfully",
            DataTransfer:createUsers
        })

    } catch (error) {
        return res.status(500).send({messageError:`error submitting Details : & {error}`})
    }
});


feedbackRouter.get('/', async(req,res)=>{
    try {
        
        const responseUsersData = await feedback.findAll() 

        // const modifiedResponseData = responseUsersData.map((item : any)
        // ({
        //    user_id:item             
        // }))
        res.send({message:"Data fetched Successfully", data:responseUsersData});
    
    } catch (error:any) {
        res.send({message:error.message})
    }
});

feedbackRouter.post('/update', async(req,res)=>{
    try {
        const response = await feedback.update(req.body,{where:{user_id:req.body.user_id}})
        
        res.send({message:'Column updates Successfully'})
    } catch (error:any) {
        res.send({message:error.message})
    }
});

feedbackRouter.patch('/:user_id', async(req,res)=>{
    try {
        const response = await feedback.update({is_deleted:true,Active:true}, {where:{user_id:parseInt(req.params.user_id)}})
        res.send({message:'Successfull'})
    } catch (error:any) {
        res.send({message:error.message})
    }
});

export default feedbackRouter;
