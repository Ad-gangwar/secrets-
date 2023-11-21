const mongoose=require('mongoose');

async function fetchData() {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/userDB');
      console.log("Connected");
    } catch (err) {
      console.error("Error:", err);
    }
}

module.exports=fetchData();