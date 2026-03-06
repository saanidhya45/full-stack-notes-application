
const express = require('express');
const userRoutes = require('./routes/user')
const notesRoutes = require('./routes/notes');
var cors = require('cors')
const app = express();
const connectMongoDb = require('./connection');
require('dotenv').config();
const PORT = process.env.PORT;
// connect mongodb 
app.use(cors());
connectMongoDb("mongodb://127.0.0.1:27017/notes-api").then(()=>console.log('mongodb connected'))
app.get('/',(req, res)=>{
    return res.json('hellow');
})
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);
app.listen(PORT, ()=> console.log(`server started at the PORT ${PORT}`))