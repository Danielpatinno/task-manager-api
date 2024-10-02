import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  priority: String,
  status: String,
  dateConclusion: Date,
  activitys: [Schema.Types.Mixed],
});


const Task = mongoose.model('Task', taskSchema);

export default Task;
