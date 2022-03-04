import express, {Application}  from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';
import db from '../db/connection';
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();

        //call middlewares
        this.middlewares();

        //create routes
        this.routes();
    }

    //TODO: Connect database

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database online running');
        } catch (err: any) {
            throw Error(err);
        }
    }

    middlewares(){
        //CORS
        this.app.use( cors() );
        //read Body
        this.app.use( express.json() );
        //Public folder
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes)
    }

    listen(){
            this.app.listen( this.port, ()=>{
            console.log(`Server running in port ${this.port}`)
        })
    }

}

export default Server;