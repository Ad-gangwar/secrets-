const mongoose=require('mongoose');
require('dotenv').config();
const url=process.env.URL;
async function fetchData() {
    try {
      // await mongoose.connect('mongodb://0.0.0.0:27017/userDB');
      await mongoose.connect(url);
      console.log("Connected");
    } catch (err) {
      console.error("Error:", err);
    }
}

module.exports=fetchData();