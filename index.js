const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

//mildeware
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5001;

//mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1u9t2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


//mongodb client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("visionElectronics");
    const services = database.collection("services");
    const allServices = database.collection("allServices");

   
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = services.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/services/:id", async (req, res) => {
      console.log("browser id is", req.params.id);
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await services.findOne(query);
      res.send(result);
    });



    app.post("/services", async (req, res) => {
      const bookingInfo = req.body;
      const query = { bookingInfo };
      const result = await allOrders.insertOne(query);
      res.json(result);
    });


    app.post("/booking",async(req,res)=>{
     const addingInfo =req.body
  
     const result = await services.insertOne({addingInfo})
     res.json(result)
    })

    app.get("/allOrder", async (req, res) => {
      const query = {};
      const cursor = allOrders.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.delete("/allOrder/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await allOrders.deleteOne(query)
      res.json(result)
    });
  } finally {
    //   await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("this is response from server and welcome everybody !! :)");
});
app.get("/n", (req, res) => {
  res.send("updated here)");
});



app.listen(port, () => {
  console.log("listening to this port", port);
});


