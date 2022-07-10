import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'
// import { createUser } from './users.controller'

export const signUp = async (req, res)=> {
    const { name, surname, age, sex, nationality, email, password, roles } = req.body;

    //const userFound = User.find({email});

    const newUser = new User({
        name,
        surname,
        age,
        sex,
        nationality,
        email,
        password: await User.encryptPassword(password)
    })
  
    if (roles) {
        const foundRoles = await Role.find({name: {$in:roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "guest"})
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    console.log(savedUser);

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    });

    res.status(200).json({token});
}


export const signIn = async (req, res) => {

    try {
        // Request body email can be an email or username
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");

        if (!userFound) return res.status(400).json({ message: "El usuario no es correcto" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({
            message: "La contraseña no es correcta",
            });

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.json({ token });
    } catch (error) {
        console.log(error);
    }
};