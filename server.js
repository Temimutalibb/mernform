const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors       = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extende:true}))
app.use(cors()) ;

 
mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
                 useNewUrlParser: true, 
                 useUnifiedTopology: true
 } )
 .then(()=>{
  console.log('connected to mongoDB')
 })

   const emailSchema =  new mongoose.Schema({
    email:{type: String,required: true}
  },{collection:'firstdata'});
 
  const Email = mongoose.model('Email', emailSchema);

  app.post('/checkemail', async (req, res)=>{
      const {email} = req.body;
      try{
        const existingEmail = await Email.findOne({email});

        if(existingEmail){
          res.json({existing:true});
        }else{
          res.json({existing:false})
        }
      }catch (error){
        console.error(error);
          res.status(500).json({error: 'Internal server error'})
      }
    }); 


    const formDataSchema =  new mongoose.Schema({
      email: String,
      password: String
    });
    
    const User = mongoose.model('User', formDataSchema, 'firstdata');

  
app.post('/submitform', async (req, res)=>{
  const {email, password} = req.body
  try{
    const newUser = new User({
      email,
      password
    });
    await  newUser.save();
    res.status(201).send({message: 'successful'})
  }catch (error){
    console.error('error saving user',error)
    res.status(400).send('error regisyering' + error.message)

        res.status(500).json({error: 'internal server error'})
  }
    
})

const loginSchema =  new mongoose.Schema({
  email: String,
  password: String
});

const userLogin = mongoose.model('userLogin', loginSchema, 'firstdata');

app.post('/login', async (req, res)=>{
  const{email, password} = req.body
  try{
    const existingUser= await userLogin.findOne({ email:email, password: password});
    if(existingUser){
      res.json({message: 'successful'});
        }else{
          res.json({message: 'failed'})
        }
      }catch (error){
        console.error(error);
          res.status(500).json({error: 'Internal server error'})
      }
})   
 
const PORT = 3001;
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);
})

