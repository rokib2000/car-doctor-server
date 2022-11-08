const { json } = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(json());

// user carDoctorDBUser
// password YPEFKVq9FbSZfWsV

const uri = "mongodb+srv://carDoctorDBUser:YPEFKVq9FbSZfWsV@cluster0.d4mp0ot.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db("carDoctor").collection("services");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
  } finally {
  }
}
run();

app.get("/", (req, res) => {
  res.send("car doctor server is running");
});

app.listen(port, () => {
  console.log(` Car Doctor server running on ${port}`);
});
