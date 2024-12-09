let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
let port = process.env.port || 3000;
let collection;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Recipe');
        console.log("database connected...");
    } catch (ex) {
        console.error(ex);
    }
}

app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/api/recipes', async (req, res) => {
    try {
        const result = await getAllRecipes();
        res.status(201).json({ message: "All recipes retrieved", data: result });
    } catch (err) {
        console.error("Error in route:", err);
        res.status(500).json({ message: "Failed to add recipe", error: err });
    }
});

app.post('/api/recipe', (req, res) => {
    var result = postRecipe(req.body);
    res.json({statusCode:200, data:result, message:'Recipe entered'});
});

async function postRecipe(recipe) {
    let result;  // Declare a variable to store the result

    try {
        await client.connect();  // Connect to the MongoDB client

        const db = client.db("test");  // Specify the database
        let coll2 = db.collection("Recipe");  // Specify the collection

        // Perform the insert operation
        result = await coll2.insertOne(recipe);
        console.log("Inserted data:", result);
        
        return result; 
    } catch (err) {
        console.error("Error inserting data:", err);
        throw err;  
    } finally {
        await client.close(); 
        console.log("Connection closed");
    }
}


async function getAllRecipes() {

    let result;  // Declare a variable to store the result

    try {
        await client.connect();  // Connect to the MongoDB client

        const db = client.db("test");  // Specify the database
        let coll2 = db.collection("Recipe");  // Specify the collection
        console.log("Connected to the collection:", coll2);

        // Perform the insert operation
        result = await coll2.find({}).toArray();
        console.log("all data:", result);
        
        return result; 
    } catch (err) {
        console.error("Error inserting data:", err);
        throw err;  
    } finally {
        await client.close(); 
        console.log("Connection closed");
    }

}

app.listen(port, () => {
    console.log('Express server started');
    runDBConnection();
});

app.get('/test', (req, res) => {
    res.send('Server is working');
});