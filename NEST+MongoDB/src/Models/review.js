"use strict";
exports.__esModule = true;
exports.ReviewSchema = void 0;
var mongoose = require("mongoose");
exports.ReviewSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    rating: {
        type: Number,
        "default": 0
    },
    created: {
        type: Date,
        "default": Date.now
    }
});
//Exporting the Review schema to reuse
exports["default"] = mongoose.model("Review", exports.ReviewSchema);
