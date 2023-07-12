const con = require("../config/db");
const bcrypt = require("bcrypt");
const jswt =require('jsonwebtoken')
require('dotenv').config()
const saltRounds = 10;



exports.register = (req, res) => {
  console.log(req.body);
  const date = new Date()
  const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); 
   const {nom,email,telephone,password,address,ville,pays,codePostal} =req.body
   console.log(req.body);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    con.query(
      "INSERT INTO user (id,email,password,type,nom,adresse,date,pays,codePostal,ville,telephone) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [null,email, hash,'client',nom,address,formattedDate,pays,codePostal,ville,telephone],
      (err, result) => {
        console.log(err);
      }
    );
  });
};



exports.login = (req, res) => {
  
  const email = req.body.email;
  const password = req.body.password;

  

  con.query("SELECT * FROM user WHERE email=?", email, (err, result) => {
    if (err) {
      console.log(err);
      req.setEncoding({ err: err });
    }
    console.log(result);
     
    if (result) {
      bcrypt.compare(password, result[0].password, (err, reponse) => {
        if (reponse) {
            req.session.user = result
             console.log(req.session.user);
            res.status(200).json({
              /* add token */
               token:jswt.sign({
                  /* user:result[0] */
                  nom:result[0].nom,
                   type:result[0].type,
                   email:result[0].email
               },process.env.jwtkey)

               /* nom:result[0].mom,
                   type:result[0].type,
                   email:result[0].email */
            })

        } else {
          res.send({ message: "wrong username / wrong password" });
        }
      });
    } else {
      res.send({ message: "User doesnt exist" });
    }
  });
};


exports.loged = (req,res)=>{

   if(req.session.user){
      res.send({loggedIn:true, user:req.session.user})
   }else{
        res.send({loggedIn:false})
   }
}

exports.getUerRole = (req, res) => {
  //console.log(req.headers.authorization);
  let authorization = req.headers.authorization.replace("bearer= ",'');

  let cookie_parsing = jswt.verify(authorization,process.env.jwtkey);

  res.status(200).json({
    role : cookie_parsing.type
  });
}


exports.getAllUserData = (req,res)=>{
    
  con.query('SELECT * FROM user WHERE type="client"',(err,result)=>{
       
       if(result){
          res.status(200).json(result)
        }else{

          res.send({error:'aucun data '})
        }

  })
   
}


exports.deleteUser = (req,res)=>{
     const {id} = req.params
    con.query(`DELETE FROM user WHERE id=${id}`,(error,result)=>{
      if(result){
        res.status(200).json(result)
      }else{
        res.send({error:'impossible de supprimer'})
      }
    })
    
}

exports.getUserById = (userId)=>{
  
   con.query(`SELECT * FROM user WHERE id=${userId}`,(err,result)=>{
       
       if(result){
          return result;
        }else{
          console.log("tsisy ninin")
        }

  })
   
}