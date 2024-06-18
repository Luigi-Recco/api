const express = require("express");
const mongoose  = require("mongoose");
const bcrypt = require("bcrypt")

const app = express();
app.use(express.json())
const port = 8000
mongoose.connect("mongodb://localhost:27017/")
.catch(console.error())

const UserCard = mongoose.model('UserCards',{
    numero:Number,
    tipo:String,
    password:Number ,
    dtValidade:Number,
    cvv:Number
})

const encrypt = async(password, numero, cvv)=>{
    const encryptedPassword = await bcrypt.hash(password, 10);
    const encryptedNumero = await bcrypt.hash(numero, 10);
    const encryptedCvv = await bcrypt.hash(cvv.toString(), 10); // cvv é convertido para string antes de criptografar

    return {
        encryptedPassword,
        encryptedNumero,
        encryptedCvv
    };
}

app.post('/',async (req,res)=>{

    let encryptedPassword = req.body.password;
    const saltPassword = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encryptedPassword,saltPassword)

    let encryptedNumero = req.body.numero;
    const saltNumero = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encryptedNumero,saltNumero)

    let encryptedCvv = req.body.cvv;
    const saltCvv = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encryptedCvv,saltCvv)
    
    const userCard = new userCard({
        numero:encryptedNumero,
        tipo:req.body.tipo,
        password:encryptedPassword,
        dtValidade:req.body.dtValidade,
        cvv:encryptedCvv
    })

    await userCard.save()
    return res.send(userCard) 
    
})

app.get('/', async(req,res)=>{
    const userCard = await UserCard.find()
    return res.send(userCard)
})

app.put('/:id', async(req,res)=>{

    let encryptedPassword = req.body.password;
    const saltPassword = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encryptedPassword,saltPassword)

    let encryptedNumero = req.body.numero;
    const saltNumero = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encryptedNumero,saltNumero)

    let encryptedCvv = req.body.cvv;
    const saltCvv = await bcrypt.genSalt(10);
    encrypt = await bcrypt.hash(encryptedCvv,saltCvv)

    const userCard = await UserCard.findByIdAndUpdate(req.params.id,{
        numero:encryptedNumero,
        tipo:req.body.tipo,
        password:encryptedPassword,
        dtValidade:req.body.dtValidade,
        cvv:encryptedCvv
    })
    
    return res.send(userCard)

})

// Delete
app.delete('/:id', async(req,res)=>{
    const userCard = await UserCard.findByIdAndDelete(req.params.id)
    return res.send(userCard)
})

app.listen(port, ()=>{
    console.log("Tá funfando")
    })