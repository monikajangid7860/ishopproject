const mongoose = require("mongoose");

const uri =
  "mongodb+srv://monika:YOUR_PASSWORD@cluster0.4n24yea.mongodb.net/wsjp106?retryWrites=true&w=majority&appName=Cluster0";

async function test() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:");
    console.error(err);
    process.exit(1);
  }
}

test();