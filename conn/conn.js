const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://avintrade:avintrade57@cluster0.ozd9re0.mongodb.net/contact").then(() => {
            console.log("Connected")
        }, (error) => { console.log(error) });

    } catch (error) {
        console.log(error)
    }
}

conn();