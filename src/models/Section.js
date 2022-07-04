import {Schema, model} from 'mongoose'


const sectionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});
export default model('Section', sectionSchema);