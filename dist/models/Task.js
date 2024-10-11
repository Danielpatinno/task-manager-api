"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const taskSchema = new Schema({
    title: String,
    priority: String,
    status: String,
    dateConclusion: Date,
    activitys: [Schema.Types.Mixed],
});
const Task = mongoose_1.default.model('Task', taskSchema);
exports.default = Task;
