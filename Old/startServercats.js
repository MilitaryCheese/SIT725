let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { connection } = require('mongoose');
const uri = "mongodb://localhost:27017";
let port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri);



async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db('test').collection('Recipe'); // Correct database
        console.log("Connected to RecipeDatabase successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
  

app.get('/', function (req,res) {
    res.render('indexMongo.html');
});

app.get('/api/cats', (req,res) => {
    getAllCats((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'get all cats successful'});
        }
    });
});

app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    var result = postCat(cat);
    res.json({statusCode:200, data:result, message:'get all cats successful'});
});

async function postCat(cat) {
    let result;  // Declare a variable to store the result

    try {
        await client.connect();  // Connect to the MongoDB client

        const db = client.db("test");  // Specify the database
        let coll2 = db.collection("Recipe");  // Specify the collection
        console.log("Connected to the collection:", coll2);

        // Perform the insert operation
        result = await coll2.insertOne(cat);
        console.log("Inserted data:", result);
        
        return result;  // Return the result after insertion
    } catch (err) {
        console.error("Error inserting data:", err);
        throw err;  // If there's an error, throw it
    } finally {
        await client.close();  // Close the connection after the operation is complete
        console.log("Connection closed");
    }
}

function getAllCats(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});