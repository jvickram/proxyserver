const express = require("express")
const app = express()

const port = process.env.PORT

app.use('/',(req,res)=>{
    res.send(`server running on port ${port}`)
})

app.listen(port)