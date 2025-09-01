const { log } = require("console");
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://santhoshs:santhosh@cluster0.vunp41i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewurlParser:true,
    useUnifiedTopology:true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err))
const expenseschema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
});
const expense = mongoose.model("Expense", expenseschema);
app.post('/addexpense', insertexpense)
async function insertexpense(req, res) {
    try {
        const newexpense = new expense(req.body);
        await newexpense.save();
        res.send("expense added")
    } catch (error) {
        res.send("Error in adding response")
    }
}
app.get('/getexpenses', getexpense);
async function getexpense(req, res) {
    try {
        const expenses = await expense.find()
        console.log(expenses)
        res.send(expenses)
    } catch (error) {
        res.status(500).send("Error in fetching expenses")
    }
}
app.delete('/deleteexpense', deleteexpense);
async function deleteexpense(req, res) {
    try {
        const { id } = req.body;
        await expense.findByIdAndDelete(id);
        res.send("Expense deleted")
    } catch (error) {
        res.status(500).send("Error in deleeting Expense")
    }
}
app.put('/updateexpense',updateexpense);
async function updateexpense(req,res){
    try{
        const {id,title,amount}=req.body;
        await expense.findByIdAndUpdate(id,{title,amount},{new:true});
        res.send("Expense Updated");



    }catch(error){
        res.status(500).send("Error in upadting expense");
    }
}
app.listen(3000);