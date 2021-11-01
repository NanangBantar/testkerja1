const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = Cart = mongoose.model("cart2", CartSchema);