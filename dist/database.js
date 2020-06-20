"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mongoose_1 = require("mongoose");
async function connection() {
    await mongoose_1.connect('mongodb://localhost/photo-gallery-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}
exports.connection = connection;
;
