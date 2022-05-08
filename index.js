const express = require('express');
const { MongoClient, ServerApiVersion, ConnectionCheckedInEvent } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')
var jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config()
const port= process.env.PORT || 5000;

app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tvznq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const bookCollection = client.db("warehouse").collection("bookInfo");
        

        // Read data in server site from database-------------
        app.get('/bookInfo', async(req, res)=> {
            const query = {};
            const cursor = bookCollection.find(query);
            const bookInformation = await cursor.toArray();
            res.send(bookInformation);
            
        })

        app.get('/', (req, res) => {
            res.send('warehouse running');
        });


        app.get('/bookInfo/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await bookCollection.findOne(query);
            res.send(result);
        })


        // post data to MongoDB ------------------------------

        app.post('/bookInfo', async(req, res)=>{
            console.log(req.body)
            const bookInfo = req.body;
            const result =await bookCollection.insertOne(bookInfo)
            res.send(result);
        })

        //Book Information Update----------------------------------
        app.put('/bookInfo/:id', async(req, res)=>{
            const id= req.params.id;
            const updatedBookInfo = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedBookInfoDoc = {
                $set: {
                   name: updatedBookInfo.name,
                   email: updatedBookInfo.email,
                   author: updatedBookInfo.author,
                   stock: updatedBookInfo.stock,
                   price: updatedBookInfo.price,
                   publisher: updatedBookInfo.publisher,
                   img: updatedBookInfo.img,
                   description: updatedBookInfo.description
                   
                }
            };

            const result = await bookCollection.updateOne(filter, updatedBookInfoDoc, options );
            res.send(result);
        })


        // BookInfo deleting from server side-----------------------
        app.delete('/bookInfo/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result  = await bookCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir)



app.listen(port, ()=>{
    console.log('warehouse port', port)
});



// All the best---------------------------