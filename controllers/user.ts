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

export const createUser = ( req: Request, res: Response)=>{

    const { body } = req;

    res.json({
        msg: 'createUser',
        body
    })
}

export const updateUser = ( req: Request, res: Response)=>{
    const { id } = req.params;
    const { body } = req;

    res.json({
        id,
        msg: 'updateUser',
        body
    })
}

export const deleteUser = ( req: Request, res: Response)=>{

    const { id } = req.params;

    res.json({
        id,
        msg: 'getUsers'
    })
}