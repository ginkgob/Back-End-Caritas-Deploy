import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'

export const signUp = async (req, res)=> {
    const { name, age, email, password, roles } = req.body;

    //const userFound = User.find({email});

    const newUser = new User({
        name,
        age,
        email,
        password: await User.encryptPassword(password)
    })
    //console.log(newUser);

    const savedUser = await newUser.save();

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    });

    res.status(200).json({token});
}


export const signIn = async (req, res) => {
    res.json('signin');
}

