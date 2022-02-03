"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose = require("mongoose");
exports.ReviewSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    rating: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
});
exports.default = mongoose.model("Review", exports.ReviewSchema);
//# sourceMappingURL=review.js.map