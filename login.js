
const mysql=require('mysql');
const express =require("express");
const server = express();
const bodyParser = require('body-parser');

const encoder= bodyParser.urlencoded();

server.use(express.static('login'))
// server.use("/assets",express.static("assets"))

var mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"trainbookingwebsite"

});
// connect to the database
mysqlConnection.connect((err)=>{
if(err) throw err
else console.log("db cooneected successfully")
});

server.post("/",encoder,(req,res)=>{
    var regist = req.body.registraionOfUser;
    var pass = req.body.password;
    mysqlConnection.query("select * from users where registration=? and password_user=?",[regist,pass],(error,result,fields)=>{
        if(result.length>0){
           res.redirect("./welcome") 
        }
        else{
            res.redirect("/")

        }
        res.end();
    }) ;
})

server.get("/welcome",(re1,res)=>{
    res.sendFile(__dirname+"/welcome.html")
})



server.listen(3001,()=>{
    console.log("runnig posrt number 3001")
});
// server.get("/",(req,res)=>{
//     res.sendFile(__dirname+"//loginpage.html")

// })

const query = 'SELECT * FROM users WHERE registration = ?';
const userId = 11111;
// check the data from Mysql
if (query.trim() !== '') {
  mysqlConnection.query(query, [userId], (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('Query results:', results);
  });
} else {
  console.error('Empty query string detected.');
}

// server.post("/",encode1,function(req,res){
//     var registration =req.body.registraion1;
//     var password =req.body.password1;
//     mysqlConnection.query(" select * from users where registration = ? AND password_user =? ",[registration,password] , (err,fields,result)=>{
//         if(!err){
//             console.log("error in my sql",err)
//             res.redirect('/');
//         }
//         else{
//            if(result.length < 0){

//             res.redirect("/welcome.html")
//         }
//         else{
//             res.redirect("/")
//         }
       
//         }
//         res.end()
//     })
// })


// //when login is succesfull
// server.get("/welcome",(req,res)=>{
//     res.sendFile(__dirname+"/welcome.html")


// })

// server.listen(3000,()=>{
  
//     console.log('listening form port number 3000');
// })