const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://jacob:<password>@cluster0.ifajw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("todo").collection("todos");
  // perform actions on the collection object
  client.close();
});
