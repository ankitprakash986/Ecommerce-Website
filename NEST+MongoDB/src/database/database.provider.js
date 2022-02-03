"use strict";
exports.__esModule = true;
exports.databaseProviders = void 0;
var mongoose = require("mongoose");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: function () {
            return mongoose.connect('mongodb://127.0.0.1:27017/');
        }
    },
];
