import {Schema, model} from 'mongoose'

export const CATEGORIES = ["sueño", "nutrición", "salud mental", "ejercicio físico"]

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
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
    },
});
export default model('Section', sectionSchema);