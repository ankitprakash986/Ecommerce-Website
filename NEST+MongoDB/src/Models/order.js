"use strict";
exports.__esModule = true;
exports.OrderSchema = void 0;
var mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    totalPrice: {
        type: Number,
        "default": 0
    },
    products: [{
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                "default": 1
            }
        },]
});
//Using deep-populate to facilitate rating feature
// OrderSchema.plugin(deepPopulate);
//Exporting the Order schema to reuse
exports["default"] = mongoose.model("Order", exports.OrderSchema);
