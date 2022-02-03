"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }],
    image: String,
    title: String,
    description: String,
    price: Number,
    quantity: Number,
    isDeleted: Boolean,
    created: {
        type: Date,
        default: Date.now
    },
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
});
exports.ProductSchema.virtual("averageRating").get(function () {
    var rating = 0;
    if (this.reviews.length == 0) {
        rating = 0;
    }
    else {
        this.reviews.map((review) => {
            rating += review.rating;
        });
        rating = rating / this.reviews.length;
    }
    return rating;
});
exports.default = mongoose.model("Product", exports.ProductSchema);
//# sourceMappingURL=product.js.map