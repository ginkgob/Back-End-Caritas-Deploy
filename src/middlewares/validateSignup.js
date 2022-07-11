import {ROLES} from '../models/Role'
import User from '../models/User'

export const checkDuplicateUser = async (req, res, next) => {
    try {
        const email = await User.findOne({ email: req.body.email });
        if (email)
            return res.status(400).json({ message: "Esta cuenta ya esta registrada" });
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

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