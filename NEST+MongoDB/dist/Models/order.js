"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose = require("mongoose");
exports.OrderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            },
        },],
});
exports.default = mongoose.model("Order", exports.OrderSchema);
//# sourceMappingURL=order.js.map