import {ROLES} from '../models/Role'
import User from '../models/user'

export const checkDuplicateUser = async (req, res, next) => {
    const user = await User.findOne({name: req.body.name})
    if (user) return res.status(400).json({message: "User already exist!"})

    const mail = await mail.findOne({name: req.body.mail})
    if (mail) return res.status(400).json({message: "Mail already exist!"})

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