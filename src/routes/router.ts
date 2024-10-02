import express from 'express'
import { createNewTask, deleteTask, getTasks, updateTask } from '../controllers/TaskController'
import { createNewCommitment, deleteCommitment, getCommitments } from '../controllers/CommitmentController'
import taskCreateValidation from '../middlewares/TaskValidation';
import validate from '../middlewares/handleValidation';
import CommitmentCreateValidation from '../middlewares/CommitmetValidation';

const router = express()

// Tasks
router.post('/newTask',taskCreateValidation(),validate, createNewTask)
router.get('/tasks', getTasks);
router.delete('/deleteTask/:id', deleteTask)
router.put('/updateTask/:id', updateTask)

// Commitments
router.post('/newCommitment', CommitmentCreateValidation(), validate, createNewCommitment)
router.get('/commitments', getCommitments)
router.delete("/deleteCommitments/:id", deleteCommitment)


export default router;