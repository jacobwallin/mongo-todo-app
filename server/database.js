const mongoose = require("mongoose");

main().catch((err) => console.log("*** Error connected to database ***", err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://jacob:jwrzRvRSDnT6JoYD@cluster0.ifajw.mongodb.net/todo?retryWrites=true&w=majority`
  );
}
