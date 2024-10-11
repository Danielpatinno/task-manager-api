"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const CommitmentSchema = new Schema({
    title: String,
    dateConclusion: Date,
});
const Commitment = mongoose_1.default.model('Commitmentsk', CommitmentSchema);
exports.default = Commitment;
