import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Person = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    phone: {
        type: String
    }
});

export default mongoose.model('Person', Person);