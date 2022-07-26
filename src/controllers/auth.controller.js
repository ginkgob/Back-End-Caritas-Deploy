import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'
// import { createUser } from './users.controller'

export const signUp = async (req, res)=> {
    const { email, password, roles } = req.body;

    //const userFound = User.find({email});

    const newUser = new User({
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

    try {
        await newUser.save();
        res.status(200).json({ message: 'Usuario creado correctamente!' });
    } catch (error) {
        res.status(500).json({ message: error });
    } finally {
        res.end();
    }
}


export const signIn = async (req, res) => {

    try {
        // Request body email can be an email or username
        const userFound = await User.findOne({ email: req.body.email }).populate("roles");

        if (!userFound) return res.status(401).json({ message: "El usuario /* o la contraseña no son correctas */" });

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        );

        if (!matchPassword)
            return res.status(401).json({message: "El usuario o la contraseña no son correctas"});
        
        const idUser = userFound._id;
        const roles = userFound.roles.map(role => role.name);
        
        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('idUser', idUser, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        res.cookie('roles', roles, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({ idUser, roles, token });
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};

export const signOut = async (req, res) => {
    res.clearCookie('jwt');
    res.clearCookie('idUser');
    res.clearCookie('roles');
    res.json({ message: "Sesión cerrada" });
}