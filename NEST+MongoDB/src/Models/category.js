"use strict";
exports.__esModule = true;
exports.CategorySchema = void 0;
var mongoose = require("mongoose");
exports.CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true
    },
    created: {
        type: Date,
        "default": Date.now
    }
});
