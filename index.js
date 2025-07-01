
const mysql=require('mysql');
const express =require("express")
const app = express();

var mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root@123",
    database:"cwt"

});
mysqlConnection.connect((err)=>{
if(!err){
    console.log("connect with DB");
}
else{
    console.log("can't connect with db\n error"+JSON.stringify(err,undefined,2));
}
});
// geting an emoloyee data
app.get("/",(req,res)=>{
   mysqlConnection.query('select * from employee', (err,rows,fields)=>{
    if(!err)
    res.send(rows[0])
 else
 console.log(err);
   })
});


//geting an spacific name employeee

app.get("/employee/:name",(req,res)=>{
    mysqlConnection.query("select * from employee where ename=?",[req.params.name],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
    else
    console.log(err);
    })
})

// delet employee

app.delete("/employee/delete/:id",(req,res)=>{
    mysqlConnection.query('DELETE FROM employee where employee_id=?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send('delete succesfully');
    else
    console.log(err);
    })
})
app.listen(3002,()=>{
    console.log("server is started");
});


