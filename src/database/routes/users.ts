// import express,{ Express } from "express";
// import users from "../model/users";

// const usersRouter = express.Router();

// usersRouter.post('/', async (req,res)=>{
//     try {
//         const reqData = req.body
//         const user_name = reqData.user_name
        
//         if(user_name.length === 0 || !user_name){
//             return res.status(400).send({message:"Please enter your nickname"})
//         }

//         const name = reqData.name

//         if(name === 0 || !name){
//             return res.status(400).send({message:"Please enter your name"})
//         }

//         const age = reqData.age

//         if(age === 0 || !age){
//             return res.status(400).send({message:"Please enter your age"})
//         }
                
//         const phone = reqData.phone

//         if(phone === 0 || !phone){
//             return res.status(400).send({message:"Please enter your phone number"})
//         }

//         const password_hashed = reqData.password_hashed

//         if(password_hashed === 0 || !password_hashed){
//             return res.status(400).send({message:"Please enter your password"})
//         }

//         const email = reqData.email 

//         if(email === 0 || !email){
//             return res.status(400).send({message:"Please enter your email"})
//         }

//         const date_of_birth = reqData.date_of_birth

//         if(date_of_birth === 0 || !date_of_birth){
//             return res.status(400).send({message:"Please enter your date_of_birth"})
//         }

//         const createUserObject : any = {
//             user_name : user_name,
//             name : name,
//             age : age,
//             date_of_birth: date_of_birth,
//             phone : phone,
//             password_hashed : password_hashed,
//             email : email,
//         }

//         const createUsers = await users.create(createUserObject)
//         res.status(200).send({message:"Users created successfully",
//             DataTransfer:createUsers
//         })

//     } catch (error) {
//         return res.status(500).send({messageError:`error submitting Details : & {error}`})
//         return res.status(500).send({messageError:`error submitting Details :}`,error})
//     }
// });




// usersRouter.post('/update', async (req, res) => {
//     try {
//         const { user_id, ...updateData } = req.body;

//         if (!user_id) {
//             return res.status(400).send({ message: 'User ID is required' });
//         }

//         const [updatedRowsCount] = await users.update(updateData, { where: { user_id } });

//         if (updatedRowsCount === 0) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         res.send({ message: 'Successfully updated', data: updateData });
//     } catch (error:any) {
//         console.error(error);
//         res.status(500).send({ message: 'An error occurred while updating the user', error: error.message });
//     }
// });

// usersRouter.patch('/:user_id', async(req,res)=>{
//     try {
//         const response = await users.update({is_deleted:true,Active:true}, {where:{user_id:parseInt(req.params.user_id)}})
//         res.send({message:'Successfull'})
//     } catch (error:any) {
//         res.send({message:error.message})
//     }
// });

// // usersRouter.patch('/:user_id', async(req,res)=>{
// //     try {
// //         const response = await users.update({is_deleted:true},
// //             {where:{user_id:parseInt(req.params.user_id)}})
// //             res.send({message:'Successfull'})
// //     } catch (error : any) {
// //         res.send({message:error.message})
// //     }
// // })

// export default usersRouter;

// usersRouter.patch('/:user_id', async(req,res)=>{
//     try {
//         const response = await users.update({is_deleted:true,Active:true}, {where:{user_id:parseInt(req.params.user_id)}})
//         res.send({message:'Successfull'})
//     } catch (error:any) {
//         res.send({message:error.message})
//     }
// });

// // usersRouter.patch('/:user_id', async(req,res)=>{
// //     try {
// //         const response = await users.update({is_deleted:true},
// //             {where:{user_id:parseInt(req.params.user_id)}})
// //             res.send({message:'Successfull'})
// //     } catch (error : any) {
// //         res.send({message:error.message})
// //     }
// // })

// export default usersRouter;
import express from "express";
import bcrypt from "bcrypt";
import users from "../model/users";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res) => {
    try {
        const { user_name, name, phone, password, email, date_of_birth } = req.body;

        if (!user_name || user_name.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your nickname" });
        }

        if (!name || name.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your name" });
        }

        if (!phone || phone.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your phone number" });
        }

        if (!password || password.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your password" });
        }

        if (!email || email.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your email" });
        }

        if (!date_of_birth || date_of_birth.trim().length === 0) {
            return res.status(400).send({ message: "Please enter your date of birth" });
        }

        const dateOfBirthTimestamp = Math.floor(new Date(date_of_birth).getTime() / 1000);

        
        const password_hashed = await bcrypt.hash(password, 10);
        console.log("hashed_password", password_hashed);

        const createUserObject = {
            user_name,
            name,
            date_of_birth: dateOfBirthTimestamp,
            phone,
            password_hashed,
            email,
            profile_picture_url: "", 
            is_deleted: false,
            Active: true,
            soft_delete: false,
        };

        const createUsers = await users.create(createUserObject);
        res.status(200).send({
            message: "User created successfully",
            DataTransfer: createUsers,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ messageError: `Error submitting details: ${error}` });
    }
});
usersRouter.get('/', async(req,res)=>{
    try {
        
        const responseUsersData = await users.findAll() 

        // const modifiedResponseData = responseUsersData.map((item : any)
        // ({
        //    user_id:item             
        // }))
        res.send({message:"Data fetched Successfully", data:responseUsersData});
    
    } catch (error:any) {
        res.send({message:error.message})
    }
});

export default usersRouter;



