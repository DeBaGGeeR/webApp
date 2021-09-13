const Mongoose = require('mongoose')

const paymentSchema = new Mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    paymentID:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    cart:{
        type: Array,
        default: []
    },
    status:{
        type: Boolean,
        default: false
    } 
},{
    timestamps: true
})
module.exports = Mongoose.model("Payments", paymentSchema)
