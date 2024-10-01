
import {app} from "./app.js";
import { connect_db } from "./db/connection.js";
import * as dotenv from 'dotenv'
import { socketConnection } from "./middlewares/ws.middleware.js";

let con

dotenv.config({path: "./env"})

try{
    con = await connect_db()
    app.listen(process.env.PORT,()=>console.log(`App started listening on port ${process.env.PORT}...`))
    socketConnection(app)
    }
catch(err){
    console.log(`Error starting server: ${err.message}`)
}

export {con}
