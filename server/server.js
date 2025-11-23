const express = require('express');
const app = express();
const cors= require('cors');

//required for render
app.use(cors({
    origin: "*",
    methods: "GET,POST,DELETE,PUT"
}));


require('dotenv').config({path:"./config.env"});
console.log('URI:', process.env.ATLAS_URI);
const port =process.env.PORT||5000;//either use the port in .env file or use 5000

// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const connection =require('./db/connection.js')

// only here the valid connection
connection.then(db=>{
    if(!db) return process.exit(1);

    // just prints this message when app is successfully running
    app.listen(port,()=>{
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err=> console.log(`Failed to connect with http server: ${err}`));

    // if error in db connection
}).catch(error =>{
    console.log(`Connection Failed...!${error}`)
})

// using routes
app.use(require('./routes/route'));




