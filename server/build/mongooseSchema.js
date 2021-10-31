"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Schema = mongoose_1.default.Schema;
let recordSchema = new Schema({
    nick: String,
    time: Number
});
exports.Record = mongoose_1.default.model('Record', recordSchema);
//# sourceMappingURL=mongooseSchema.js.map