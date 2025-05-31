const express = require('express');
const bodyParser = require('body-parser');
const jquery=require('jquery');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 4000;
const mongoose = require('mongoose');
const { error } = require('jquery');
mongoose.connect("mongodb+srv://kokkerayamini:pxe7fEXlRIF5ITmx@todoapp.lpevoiq.mongodb.net/")
.then(()=>console.log("connect to mongoDB"))
.catch(err=>console.error("mongoDB connection error:",err));
const trySchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Task", trySchema);
const todo = new Item({ name: "python" });
app.get('/', (_, res) => {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("something went wrong");
        });
});
app.post('/', (req, res) => {
    const ItemName = req.body.ele1;
    const todo = new Item({ name: ItemName });
    todo.save();
    res.redirect("/");
});
app.post('/delete', async(req, res) => {
    const check = req.body.checkbox1;
    try {
        await Item.findByIdAndDelete(check);
        console.log ("delete item with id",check);
        res.redirect("/")
    }
    catch(err){
        console.error("error deleting items",err);
        res. status(500).send("error deleting item")
    };

});
app.listen(port, () => {

    console.log(`server started at port http://localhost:${port}`);
});
