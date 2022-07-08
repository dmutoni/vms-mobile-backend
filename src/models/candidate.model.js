import mongoose from 'mongoose';
import { registerSchema } from 'swaggiffy';

mongoose.Promise = global.Promise;

const candidateSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    names: {
        type: String,
        required: true,
    },
    nationalId: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['female', 'male'],
    },
    missionStatement: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true
    },
});

const Candidate = mongoose.model('Candidate', candidateSchema);
registerSchema('Candidate', candidateSchema, {orm: 'mongoose'});
export default Candidate;