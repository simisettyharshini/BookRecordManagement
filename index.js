const express = require("express");
const { users } =require("./data/users.json");
const app = express();

const PORT = 8081;

app.use(express.json());


app.get("/",(req,res)=>{
    // for normal format we can use send method
     //res.status(200).send("Server is up")
    res.status(200).json({
        message: "Server is running :))",
    });
});

/**
 * Route:/users
 * Method:GET
 * Description :Get all users
 * Acess : public 
 * Parameters:None
 */

app.get("/users",(req,res)=>{
    res.status(200).json({
        sucess:true,
        data: users
    })
})


app.get("*",(req,res)=>{
    res.status(404).json({
        message: "This route doesn't exists"
    });
});

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`);
});