import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema (

    {
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        age: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        province: {
            type: String,
        },
        zip: {
            type: String,
        },
        phone: {
            type: String,
        },
        sex: {
            type: String,
        },
        nationality: {
            type: String,
        },
        email: {
            type: String,
            // unique: true,
            // required: true,
        },
        password: {
            type: String,
            // required: true,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model("User", userSchema);