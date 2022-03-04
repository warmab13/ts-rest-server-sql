import { Request, Response } from "express";
import User from "../models/user";


export const getUsers = async( req: Request, res: Response)=>{
    try {
        const users = await User.findAll();
    
        res.json({users, total: users.length})
        
    } catch (error: any) {
        res.json(error)
    }
}

export const getUser = async( req: Request, res: Response)=>{
    const {id} = req.params;

    try {
        const user = await User.findByPk( id );
        
        if(!user){
            res.status(404).json({
                msg: `User with ID ${id} does not exists`
            })
        }

        res.json(user);
    } catch (error:any) {
        res.json(error)
    }

    res.json({
        msg: 'getUser',
        id
    })
}

export const createUser = async( req: Request, res: Response)=>{

    const { body } = req;

    const emailExist = await User.findOne({
        where:{
            email: body.email
        }
    })

    if(emailExist){
        return res.status(400).json({
            msg: `Already exists a user with this email ${body.email}`
        })
    }

    try {
        const user = User.build(body);
        await user.save();

        res.json(user)

    } catch (error:any) {
        res.status(500).json({
            msg: 'Talk to administrator',
            error
        })
    }

    res.json({
        msg: 'createUser',
        body
    })
}

export const updateUser = async( req: Request, res: Response)=>{
    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk(id);
        if( !user ){
            return res.status(404).json({
                msg: `The user with ID ${id} does not exist`
            })
        }

        await user.update(body);

        res.json( user )

    } catch (error:any) {
        res.status(500).json({
            msg: 'Talk to administrator',
            error
        })
    }

    res.json({
        id,
        msg: 'updateUser',
        body
    })
}

//Create logic delete
export const deleteUser = async( req: Request, res: Response)=>{

    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if( !user ){
            return res.status(404).json({
                msg: `The user with ID ${id} does not exist`
            })
        }
        
        //await user.destroy();
    
        await user.update({ status: 0 });
        
    } catch (error) {
        res.json(error);
    }

    res.json({
        user,
        msg: 'Delete user'
    })
}