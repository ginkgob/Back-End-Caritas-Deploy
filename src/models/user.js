import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;


const userSchema = Schema ({

    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    roles:[{
        ref: "Role",
        type: Schema.Types.ObjectId
    }], 
}, {
        timestamps: true,
        versionKey: false,
});

export default userSchema;