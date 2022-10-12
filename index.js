const express=require('express');
require('./db/dbConnection');
const errorMiddleview=require('./errorMiddelview/hataMiddelvies')
const userRouter=require('./router/userRouter')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/users',userRouter)


app.get('/', (req, res) => {
    console.log(req.headers["user-agent"]);
    res.status(200).json({'mesaj':'hoşgeldiniz'}); 
});






// function test() {
//     // token oluşturma
//     const token = jwt.sign({_userID:'ozgurmsll',isAdmin:true,aktif:true,},'123123',{expiresIn:'0 second'})
//     // token kontrol
//     const kontrol=jwt.verify(token,'123123')

    
// }






app.use(errorMiddleview)
app.listen(3000,()=>{
    console.log(`${"http://localhost:3000/"} aktif edildim`);
})


















