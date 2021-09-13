const Mongoose  = require("mongoose");

const categorySchema = new Mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    }
},{
    timeStamps: true
})

module.exports = Mongoose.model("Category", categorySchema)