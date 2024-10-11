"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TaskController_1 = require("../controllers/TaskController");
const CommitmentController_1 = require("../controllers/CommitmentController");
const TaskValidation_1 = __importDefault(require("../middlewares/TaskValidation"));
const handleValidation_1 = __importDefault(require("../middlewares/handleValidation"));
const CommitmetValidation_1 = __importDefault(require("../middlewares/CommitmetValidation"));
const router = (0, express_1.default)();
// Tasks
router.post('/newTask', (0, TaskValidation_1.default)(), handleValidation_1.default, TaskController_1.createNewTask);
router.get('/tasks', TaskController_1.getTasks);
router.delete('/deleteTask/:id', TaskController_1.deleteTask);
router.put('/updateTask/:id', TaskController_1.updateTask);
// Commitments
router.post('/newCommitment', (0, CommitmetValidation_1.default)(), handleValidation_1.default, CommitmentController_1.createNewCommitment);
router.get('/commitments', CommitmentController_1.getCommitments);
router.delete("/deleteCommitments/:id", CommitmentController_1.deleteCommitment);
exports.default = router;
