var express = require("express")
var app = express()
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var port = process.env.port || 3000;

const addTwoNumber= (n1,n2) => {
    return n1+n2;
}

const subtractTwoNumber = (n1, n2) => {
    return n1 - n2;
}

app.get("/addTwoNumber", (req,res)=>{
    const n1= parseInt(req.query.n1);
    const n2=parseInt(req.query.n2);
    const result = addTwoNumber(n1,n2);
    res.json({statuscocde:200, data: result }); 
});

// GET endpoint for subtraction
app.get("/subtractTwoNumber", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    const result = subtractTwoNumber(n1, n2);
    res.json({ statusCode: 200, data: result });
});

// POST endpoint that accepts JSON body
app.post("/processData", (req, res) => {
    const { n1, n2, operation } = req.body;

    let result;
    if (operation === "add") {
        result = addTwoNumber(n1, n2);
    } else if (operation === "subtract") {
        result = subtractTwoNumber(n1, n2);
    } else {
        return res.status(400).json({ statusCode: 400, message: "Invalid operation" });
    }

    res.json({ statusCode: 200, data: result });
});

app.listen(port,()=>{
console.log("App listening to: "+port)
})
