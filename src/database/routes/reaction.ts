import express,{ Express } from "express";
import reaction from "../model/reaction";

const reactionRouter = express.Router();

reactionRouter.post('/', async (req,res)=>{
    try {
        const reqData = req.body
        const reaction_type = reqData.reaction_type
        
        if(reaction_type.length === 0 || !reaction_type){
            return res.status(400).send({message:"Please enter your nickname"})
        }

        const user_id = reqData.user_id

        if(user_id === 0 || !user_id){
            return res.status(400).send({message:"Please enter your name"})
        }

        const image_url = reqData.image_url

        if(image_url === 0 || !image_url) {
            return res.status(400).send({message : "Please enter your image URL"})
        }

       

        const createReactionObject : any = {
            reaction_type : reaction_type,
            user_id : user_id,
            image_url : image_url
        }

        const createReactions = await reaction.create(createReactionObject)
        res.status(200).send({message:"Reactions created successfully",
            DataTransfer:createReactions
        })

    } catch (error) {
        return res.status(500).send({messageError:`error submitting Details : & {error}`})
    }
});


reactionRouter.get('/', async(req,res)=>{
    try {
        
        const responseReactionsData = await reaction.findAll() 

        // const modifiedResponseData = responseUsersData.map((item : any)
        // ({
        //    user_id:item             
        // }))
        res.send({message:"Data fetched Successfully", data:responseReactionsData});
    
    } catch (error:any) {
        res.send({message:error.message})
    }
});

reactionRouter.post('/update', async(req,res)=>{
    try {
        const response = await reaction.update(req.body,{where:{user_id:req.body.user_id}})
        
        res.send({message:'Column updates Successfully'})
    } catch (error:any) {
        res.send({message:error.message})
    }
});

reactionRouter.patch('/:user_id', async(req,res)=>{
    try {
        const response = await reaction.update({is_deleted:true,}, {where:{user_id:parseInt(req.params.user_id)}})
        res.send({message:'Successfull'})
    } catch (error:any) {
        res.send({message:error.message})
    }
});

export default reactionRouter;
