import {ROLES} from '../models/Role'
import User from '../models/user'

export const checkDuplicateUser = async (req, res, next) => {
    const user = await User.findOne({name: req.body.name})
    if (user) return res.status(400).json({message: "Esta cuenta ya esta registrada"})

    const email = await User.findOne({email: req.body.email})
    if (email) return res.status(400).json({message: "Este email ya esta registrado"})

    next()

}

export const checkExistentRoles = (req, res, next) => {
    if(req.body.role) {
        for (let i=0; i<req.body.role.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({messages: `Role ${req.body.roles[i]} does not exist`})
            }
        }    
    }
    next(); 
}