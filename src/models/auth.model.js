import mongoose from 'mongoose';
import { registerSchema } from 'swaggiffy';

mongoose.Promise = global.Promise;

const AuthSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
});

registerSchema('Auth', AuthSchema, {orm: 'mongoose'});

export default Auth;