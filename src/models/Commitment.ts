import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommitmentSchema = new Schema({
  title: String,
  dateConclusion: Date,
});

const Commitment = mongoose.model('Commitmentsk', CommitmentSchema);

export default Commitment;
