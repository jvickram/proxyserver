const express = require("express")
const app = express()

const port = process.env.PORT

app.get('/api',(req,res)=>{
    res.send(`server running on port ${port}`)
    console.log(req.headers)
})

app.listen(port,()=>{console.log("Server started on port !!!!",port)})