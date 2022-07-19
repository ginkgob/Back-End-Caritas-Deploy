import {Schema, model} from 'mongoose'

export const CATEGORIES = ["sueño", "nutrición", "salud mental", "ejercicio físico"]

const sectionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        enum: CATEGORIES,
        required: true,
    },
});
export default model('Section', sectionSchema);