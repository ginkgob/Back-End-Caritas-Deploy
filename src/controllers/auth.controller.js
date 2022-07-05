import User from '../models/user'
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

    const signInError = "El usuario o la contraseña no son correctas";
    const resError = res.status(401).json({message: signInError});
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return resError;

    const matchPassword = await User.comparePassword(req.body.password, userFound.password) 

    if(!matchPassword) return resError;

    //console.log(userFound)

    const token = jwt.sign({id: userFound._id}, config.SECRET, {expiresIn:8640})
    
    res.json({token})
}

export const createUser = (req, res) => {
    res.json('creating user')
}
