import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

export const signUp = async (req, res)=> {
    const { name, age, email, password, roles } = req.body;

    //const userFound = User.find({email});

    const newUser = new User({
        name,
        age,
        email,
        password: await User.encryptPassword(password)
    })
  
    if (roles) {
        const foundRoles = await Role.find({name: {$in:roles}})
        newUser.roles = foundRoles.map(role => role.id)
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
    res.json('signin');
}

