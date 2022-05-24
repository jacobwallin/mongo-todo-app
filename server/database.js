const mongoose = require("mongoose");

main().catch((err) => console.log("*** Error connected to database ***", err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
